import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsSlice,
  IngredientsState
} from '../slices/ingredientSlice/ingredientsSlice';
import { feedSlice, FeedState } from '../slices/feedSlice/feedSlice';
import { combineSlices } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientSlice/ingredientsSlice';
import feedReducer from '../slices/feedSlice/feedSlice';
import cookingReducer, {
  CookingState
} from '../slices/cookingSlice/cookingSlice';
import userReducer, { UserState } from '../slices/userSlice/userSlice';
import orderReducer, { OrderState } from '../slices/orderSlice/orderSlice';
import ordersReducer, { OrdersState } from '../slices/ordersSlice/ordersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  cook: cookingReducer,
  user: userReducer,
  order: orderReducer,
  orders: ordersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
export type RootState = {
  ingredients: IngredientsState;
  feed: FeedState;
  cook: CookingState;
  user: UserState;
  order: OrderState;
  orders: OrdersState;
};

export default rootReducer;

export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
