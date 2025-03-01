// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { getOrderByNumberApi, TOrderResponse } from '@api';
// import { TIngredient, TOrder } from '@utils-types';

// interface ConstructorState {
//   constructorItems: {
//     bun: TIngredient | null;
//     ingredients: TIngredient[];
//   };
//   orderRequest: boolean;
//   orderModalData: TOrder | null;
//   loading: boolean;
//   error: string | null | undefined;
// }

// const initialState: ConstructorState = {
//   constructorItems: {
//     bun: null,
//     ingredients: []
//   },
//   orderRequest: false,
//   orderModalData: null,
//   loading: false,
//   error: null
// };

// export const sendOrderRequest = createAsyncThunk('constructor/orderRequest', async (number: number) => {
//   const response = await getOrderByNumberApi(number);
//   console.log('API response:', response);
//   const data = response;
//   console.log('data', data);
//   return data as TOrderResponse;
// });

// export const constructorSlice = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     setConstructorItems: (state, action: PayloadAction<TIngredient>) => {
//       if (action.payload.type === 'bun') {
//         state.constructorItems.bun = action.payload;
//       } else {
//         state.constructorItems.ingredients.push(action.payload);
//       }
//     },
//     cclearConstructor: (state) => {
//       state.constructorItems.bun = null;
//       state.constructorItems.ingredients = [];
//     }
//   },
//   selectors: {
//     fetchIngredients: (state: ConstructorState) => state
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendOrderRequest.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendOrderRequest.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(sendOrderRequest.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderRequest = false;
//         state.orderModalData = action.payload.orders;
//       });
//   }
// });
// export const { setConstructorItems, clearConstructor } = constructorSlice.actions;
// export default constructorSlice.reducer;

// export const selectConstructorItems = (state: { constructor: ConstructorState }) =>
//   state.constructor.constructorItems;
// export const selectOrderRequest = (state: { constructor: ConstructorState }) =>
//   state.constructor.orderRequest;
// export const selectOrderModalData = (state: { constructor: ConstructorState }) =>
//   state.constructor.orderModalData;
