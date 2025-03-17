import { orderBurgerApi } from '@api';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { pushOrder, resetOrder, selectOrder } from './orderSlice';
import { TOrder } from '@utils-types';

const mockApiOrder = {
  success: true,
  orderRequest: false,
  order: [
    {
      createdAt: '2025-03-12T15:49:56.480Z',
      ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
      name: 'Флюоресцентный люминесцентный бургер',
      number: 70789,
      status: 'done',
      updatedAt: '2025-03-12T15:49:57.228Z',
      _id: '67d1ad24133acd001be57506'
    }
  ]
};

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(() => Promise.resolve(mockApiOrder))
}));

describe('Тесты для orderSlice', () => {
  describe('Асинхронный редьюсер pushOrder', () => {
    describe('Синхронный редьюсер resetOrder', () => {
      it('Должен сбрасывать заказ и состояние загрузки', () => {
        const store = configureStore({
          reducer: {
            order: reducer
          }
        });

        store.dispatch({
          type: 'order/pushOrder/fulfilled',
          payload: { order: mockApiOrder.order }
        });

        store.dispatch(resetOrder());

        expect(store.getState().order).toEqual({
          order: null,
          orderRequest: false,
          loading: false,
          error: null
        });
      });
    });

    describe('Получение заказа с сервера ассинхронного экшена pushOrder', () => {
      it('Должен корректно обрабатывать успешную загрузку заказа', async () => {
        const store = configureStore({
          reducer: {
            order: reducer
          }
        });

        await store.dispatch(pushOrder(mockApiOrder.order[0].ingredients));

        expect(store.getState().order.order).toEqual(mockApiOrder.order);

        expect(orderBurgerApi).toHaveBeenCalledTimes(1);
      });
    });
    describe('Состояние загрузки ассинхронного редьюсера pushOrder', () => {
      it('Должен корректно обрабатывать состояние загрузки', async () => {
        const store = configureStore({
          reducer: {
            order: reducer
          }
        });

        store.dispatch(pushOrder(mockApiOrder.order[0].ingredients));

        expect(store.getState().order).toEqual({
          orderRequest: true,
          order: null,
          loading: true,
          error: 'order/pushOrder/pending'
        });
      });
    });
    describe('Отработка ошибки при работе редьюсера pushOrder', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        const errorMessage = 'Server error';
        (
          orderBurgerApi as jest.MockedFunction<typeof orderBurgerApi>
        ).mockRejectedValueOnce({
          message: errorMessage
        });

        const store = configureStore({
          reducer: {
            order: reducer
          }
        });

        await store.dispatch(pushOrder(mockApiOrder.order[0].ingredients));

        expect(store.getState().order).toEqual({
          orderRequest: false,
          order: null,
          loading: false,
          error: errorMessage
        });
      });
    });
  });
  describe('Селекторы orderSlice', () => {
    describe('Селектор selectOrder', () => {
      it('Должен выбирать заказ из стора', () => {
        const mockState = {
          order: {
            order: mockApiOrder.order[0],
            orderRequest: false,
            loading: false,
            error: null
          }
        };
        const result = selectOrder(mockState);
        expect(result).toEqual(mockApiOrder.order[0]);
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
