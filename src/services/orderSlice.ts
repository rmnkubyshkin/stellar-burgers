import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '../utils/burger-api';
import { TOrder } from '../utils/types';

export interface OrderState {
  order: TOrder;
  orderRequest: boolean;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: OrderState = {
  order: {} as TOrder,
  orderRequest: false,
  loading: false,
  error: null
};

export const pushOrder = createAsyncThunk(
  'order/pushOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    console.log('response: ', response);
    return response as TNewOrderResponse;
  }
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrder: (state: OrderState) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(pushOrder.pending, (state, action) => {
        state.orderRequest = true;
        state.loading = true;
        state.error = action.type;
        console.log('pending.order: ', state.order);
        console.log('pending.orderRequest: ', state.orderRequest);
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
        console.log('fulfilled.order: ', state.order);
        console.log('fulfilled.orderRequest: ', state.orderRequest);
      });
  }
});
export default orderSlice.reducer;
export const { selectOrder } = orderSlice.selectors;
