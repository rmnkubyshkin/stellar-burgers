import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  data: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: IngredientsState = {
  data: [],
  loading: false,
  error: null
};
export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response as TIngredient[];
  }
);
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    // addIngredients: (state, action: PayloadAction<TIngredient>) => {
    //   state.data.push(action.payload);
    // }
  },
  selectors: {
    selectIngredients: (state: IngredientsState) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state, action) => {
        console.log('action:', action);
        state.loading = true;
        state.error = action.type;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  }
});
export default ingredientsSlice.reducer;
export const { selectIngredients } = ingredientsSlice.selectors;
