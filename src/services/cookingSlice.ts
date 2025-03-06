import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi, TOrderResponse } from '@api';
import { TIngredient, TOrder } from '@utils-types';

export interface CookingState {
  cookingItems: CookingItemsType;
  loading: boolean;
  error: string | null | undefined;
}

export type CookingItemsType = {
  bun: TIngredient | null;
  ingredients: Array<TIngredient>;
};
const initialState: CookingState = {
  cookingItems: {
    bun: null,
    ingredients: []
  },
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
    }
  },
  selectors: {}
});
export default cookingSlice.reducer;

export const { setCookingItems } = cookingSlice.actions;
