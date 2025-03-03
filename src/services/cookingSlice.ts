import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi, TOrderResponse } from '@api';
import { TIngredient, TOrder } from '@utils-types';

export interface CookingState {
  cookingItems: CookingItemsType;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null | undefined;
}

export type CookingItemsType = {
  bun: TIngredient;
  ingredients: Array<TIngredient>;
};
const initialState: CookingState = {
  cookingItems: {
    bun: {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

const cookingSlice = createSlice({
  name: 'cook',
  initialState,
  reducers: {
    setCookingItems: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.cookingItems.bun = action.payload;
        const noBuns = state.cookingItems.ingredients.filter(
          (ingredient) =>
            ingredient.type === 'main' || ingredient.type === 'sauce'
        );
        state.cookingItems.ingredients = noBuns;
      } else {
        state.cookingItems.ingredients = [
          ...state.cookingItems.ingredients,
          action.payload
        ];
      }
    },
    handleOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    handleOrderModalData: (state, action: PayloadAction<TOrder>) => {
      state.orderModalData = action.payload;
    },
    clearCooking: (state) => {
      state.cookingItems.bun.price = 0;
      state.cookingItems.ingredients = [];
    }
  },
  selectors: {
    getModalData: (state: CookingState) => state.orderModalData,
    getCookingItems: (state: CookingState) => state.cookingItems,
    getOrderRequest: (state: CookingState) => state.orderRequest
  }
});
export default cookingSlice.reducer;
export const { getCookingItems, getModalData, getOrderRequest } =
  cookingSlice.selectors;

export const {
  setCookingItems,
  handleOrderRequest,
  handleOrderModalData,
  clearCooking
} = cookingSlice.actions;
