import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface CookingState {
  cookingItems: CookingItemsType;
  loading: boolean;
  error: string | null | undefined;
}

export type CookingItemsType = {
  bun: TIngredient | null;
  ingredients: Array<TIngredient>;
};
export const initialState: CookingState = {
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
    resetCookingItems: (state) => {
      (state.cookingItems.bun = null), (state.cookingItems.ingredients = []);
    },
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
    removeCookingItem: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type !== 'bun') {
        state.cookingItems.ingredients = state.cookingItems.ingredients.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    handleMoveUpIngredient: (state, action: PayloadAction<TIngredient>) => {
      const index = state.cookingItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index > 0) {
        const updatedIngredients = [...state.cookingItems.ingredients];

        [updatedIngredients[index - 1], updatedIngredients[index]] = [
          updatedIngredients[index],
          updatedIngredients[index - 1]
        ];
        state.cookingItems.ingredients = updatedIngredients;
      }
    },
    handleMoveDownIngredient: (
      state,
      action: PayloadAction<{ ingredient: TIngredient; totalItems: number }>
    ) => {
      const index = state.cookingItems.ingredients.findIndex(
        (item) => item._id === action.payload.ingredient._id
      );
      if (index + 1 !== action.payload.totalItems) {
        const updatedIngredients = [...state.cookingItems.ingredients];

        [updatedIngredients[index], updatedIngredients[index + 1]] = [
          updatedIngredients[index + 1],
          updatedIngredients[index]
        ];
        state.cookingItems.ingredients = updatedIngredients;
      }
    }
  },
  selectors: {
    selectCookingItemsLoading: (state) => state.loading,
    selectCookingItemsError: (state) => state.error,
    selectCookingItems: (state) => state.cookingItems
  }
});
export default cookingSlice.reducer;

export const {
  selectCookingItems,
  selectCookingItemsLoading,
  selectCookingItemsError
} = cookingSlice.selectors;

export const {
  resetCookingItems,
  setCookingItems,
  removeCookingItem,
  handleMoveUpIngredient,
  handleMoveDownIngredient
} = cookingSlice.actions;
