import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  TFeedsResponse,
  TNewOrderResponse
} from '../../../utils/burger-api';
import { TOrder } from '../../../utils/types';

export interface OrderState {
  order: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error: string | null | undefined;
}

export const initialState: OrderState = {
  order: null,
  orderRequest: false,
  loading: false,
  error: null
};

export const pushOrder = createAsyncThunk(
  'order/pushOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response as TNewOrderResponse;
  }
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state: OrderState) => {
      state.order = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    selectOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(pushOrder.pending, (state, action) => {
        state.orderRequest = true;
        state.loading = true;
        state.error = action.type;
      })
      .addCase(pushOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(pushOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.order = action.payload.order;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
export const { selectOrder } = orderSlice.selectors;
