import ingredientsReducer from '../slices/ingredientSlice/ingredientsSlice';
import feedReducer from '../slices/feedSlice/feedSlice';
import cookingReducer from '../slices/cookingSlice/cookingSlice';
import userReducer from '../slices/userSlice/userSlice';
import orderReducer from '../slices/orderSlice/orderSlice';
import ordersReducer from '../slices/ordersSlice/ordersSlice';
import rootReducer, { RootState } from './store';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при вызове с undefined состоянием и неизвестным экшеном', () => {
    const state = rootReducer(undefined, { type: 'unknownType' });

    const expectedState: RootState = {
      ingredients: ingredientsReducer(undefined, { type: 'unknownType' }),
      feed: feedReducer(undefined, { type: 'unknownType' }),
      cook: cookingReducer(undefined, { type: 'unknownType' }),
      user: userReducer(undefined, { type: 'unknownType' }),
      order: orderReducer(undefined, { type: 'unknownType' }),
      orders: ordersReducer(undefined, { type: 'unknownType' })
    };

    expect(state).toEqual(expectedState);
  });
});
