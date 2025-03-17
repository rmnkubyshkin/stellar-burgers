import { getIngredientsApi, TFeedsResponse } from '@api';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { getIngredients, selectIngredients } from './ingredientsSlice';

const mockApiIngredients = {
  success: true,
  data: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ]
};

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn(() => Promise.resolve(mockApiIngredients))
}));

describe('Тесты для ingredientsSlice', () => {
  describe('Асинхронный экшен getIngredients', () => {
    describe('Получение данных с сервера редьюсера getIngredients', () => {
      it('Должен корректно обрабатывать успешную загрузку ингредиентов', async () => {
        const store = configureStore({
          reducer: {
            ingredients: reducer
          }
        });

        await store.dispatch(getIngredients());

        expect(store.getState().ingredients.data).toEqual(mockApiIngredients);

        expect(getIngredientsApi).toHaveBeenCalledTimes(1);
      });
    });
    describe('Состояние загрузки ассинхронного редьюсера getIngredients', () => {
      it('Должен корректно обрабатывать состояние загрузки', async () => {
        const store = configureStore({
          reducer: {
            ingredients: reducer
          }
        });
        store.dispatch(getIngredients());
        expect(store.getState().ingredients).toEqual({
          data: [],
          loading: true,
          error: 'ingredients/getIngredients/pending'
        });
      });
    });
    describe('Отработка ошибки при работе редьюсера getIngredients', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        const errorMessage = 'Server error';
        (
          getIngredientsApi as jest.MockedFunction<typeof getIngredientsApi>
        ).mockRejectedValueOnce({
          message: errorMessage
        });

        const store = configureStore({
          reducer: {
            ingredients: reducer
          }
        });

        await store.dispatch(getIngredients());

        expect(store.getState().ingredients).toEqual({
          data: [],
          loading: false,
          error: errorMessage
        });
      });
    });
  });
  describe('Селекторы ingredientsSlice', () => {
    describe('Селектор selectIngredients', () => {
      it('Должен получать все Ингредиенты с сервера', () => {
        const mockState = {
          ingredients: {
            data: mockApiIngredients.data,
            loading: false,
            error: null
          }
        };

        const result = selectIngredients(mockState);

        expect(result).toEqual(mockApiIngredients.data);
      });
    });
  });
});
