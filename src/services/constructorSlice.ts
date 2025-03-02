import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi, TOrderResponse } from '@api';
import { TIngredient, TOrder } from '@utils-types';

export interface ConstructorState {
  constructorItems: ConstructorItemsType;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null | undefined;
}

export type ConstructorItemsType = {
  count: { value: number };
  ingredients: TIngredient[];
};
const initialState: ConstructorState = {
  constructorItems: {
    count: { value: 0 },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setConstructorItems: (
      state,
      action: PayloadAction<ConstructorItemsType>
    ) => {
      console.log('initialState: ', initialState);
      console.log('state.constructorItems: ', state.constructorItems);
      console.log('action.payload: ', action.payload);
      state.constructorItems.count.value += action.payload.count.value;
      state.constructorItems.ingredients = [
        ...state.constructorItems.ingredients,
        ...action.payload.ingredients
      ];
    },
    handleOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    orderModalData: (state, action: PayloadAction<TOrder>) => {
      state.orderModalData = action.payload;
    },
    clearConstructor: (state) => {
      state.constructorItems.count.value = 0;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    getModalData: (state: ConstructorState) => state.orderModalData,
    getConstructorItems: (state: ConstructorState) => state.constructorItems,
    getOrderRequest: (state: ConstructorState) => state.orderRequest
  }
});
export default constructorSlice.reducer;
export const { getConstructorItems, getModalData, getOrderRequest } =
  constructorSlice.selectors;
// export const handleOrderRequest = (state: RootState) =>
//   state.constructor.orderRequest;
// export const setConstructorItems = (state: RootState) =>
//   state.constructor.constructorItems;
// export const orderModalData = (state: RootState) =>
//   state.constructor.orderModalData;

export const {
  setConstructorItems,
  handleOrderRequest,
  orderModalData,
  clearConstructor
} = constructorSlice.actions;
