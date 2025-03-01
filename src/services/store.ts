import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsSlice,
  IngredientsState
} from '../services/ingredientsSlice';
import { feedSlice, FeedState } from '../services/feedSlice';
import { combineSlices } from '@reduxjs/toolkit';
import ingredientsReducer from '../services/ingredientsSlice';
import feedReducer from '../services/feedSlice';
const rootReducer = combineSlices({});

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    feed: feedReducer
  }
});
export type RootState = {
  ingredients: IngredientsState;
  feed: FeedState;
};
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
