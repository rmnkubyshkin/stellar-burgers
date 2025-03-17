import { getOrdersApi } from '@api';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { getOrders, selectOrders } from './ordersSlice';
import { TOrder } from '@utils-types';

const mockApiOrders = [
  {
    createdAt: '2025-03-12T15:49:56.480Z',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
    name: 'Флюоресцентный люминесцентный бургер',
    number: 70789,
    status: 'done',
    updatedAt: '2025-03-12T15:49:57.228Z',
    _id: '67d1ad24133acd001be57506'
  }
];

jest.mock('@api', () => ({
  getOrdersApi: jest.fn(() => Promise.resolve(mockApiOrders))
}));

describe('Тесты для ordersSlice', () => {
  describe('Асинхронный редьюсер getOrders', () => {
    describe('Получение заказов с сервера асинхронного экшена getOrders', () => {
      it('Должен корректно обрабатывать успешную загрузку заказов', async () => {
        const store = configureStore({
          reducer: {
            orders: reducer
          }
        });

        await store.dispatch(getOrders());

        expect(store.getState().orders.orders).toEqual(mockApiOrders);

        expect(getOrdersApi).toHaveBeenCalledTimes(1);
      });
    });

    describe('Состояние загрузки асинхронного редьюсера getOrders', () => {
      it('Должен корректно обрабатывать состояние загрузки', async () => {
        const store = configureStore({
          reducer: {
            orders: reducer
          }
        });

        store.dispatch(getOrders());

        expect(store.getState().orders).toEqual({
          orders: [],
          loading: true,
          error: null
        });
      });
    });

    describe('Отработка ошибки при работе редьюсера getOrders', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        const errorMessage = 'Server error';
        (
          getOrdersApi as jest.MockedFunction<typeof getOrdersApi>
        ).mockRejectedValueOnce({
          message: errorMessage
        });

        const store = configureStore({
          reducer: {
            orders: reducer
          }
        });

        await store.dispatch(getOrders());

        expect(store.getState().orders).toEqual({
          orders: [],
          loading: false,
          error: errorMessage
        });
      });
    });
  });

  describe('Селекторы ordersSlice', () => {
    describe('Селектор selectOrders', () => {
      it('Должен выбирать заказы из стора', () => {
        const mockState = {
          orders: {
            orders: mockApiOrders,
            loading: false,
            error: null
          }
        };
        const result = selectOrders(mockState);
        expect(result).toEqual(mockApiOrders);
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
