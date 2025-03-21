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
    const mockedGetOrdersApi = getOrdersApi as jest.MockedFunction<
      typeof getOrdersApi
    >;

    describe('Тестирование getOrders.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки', () => {
        mockedGetOrdersApi.mockImplementationOnce(() => new Promise(() => {}));

        const store = configureStore({
          reducer: {
            orders: reducer
          }
        });

        store.dispatch(getOrders());

        const state = store.getState().orders;
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
        expect(state.orders).toEqual([]);
      });
    });

    describe('Тестирование getOrders.fulfilled', () => {
      it('Должен корректно обрабатывать успешную загрузку заказов', async () => {
        mockedGetOrdersApi.mockResolvedValueOnce(mockApiOrders);

        const store = configureStore({
          reducer: {
            orders: reducer
          }
        });

        await store.dispatch(getOrders());

        const state = store.getState().orders;
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
        expect(state.orders).toEqual(mockApiOrders);
        expect(getOrdersApi).toHaveBeenCalledTimes(1);
      });
    });

    describe('Тестирование getOrders.rejected', () => {
      it('Должен корректно обрабатывать ошибку при загрузке заказов', async () => {
        const errorMessage = 'Ошибка загрузки заказов';
        mockedGetOrdersApi.mockRejectedValueOnce({ message: errorMessage });

        const store = configureStore({
          reducer: {
            orders: reducer
          }
        });

        await store.dispatch(getOrders());

        const state = store.getState().orders;
        expect(state.loading).toBe(false);
        expect(state.error).toBe(errorMessage);
        expect(state.orders).toEqual([]);
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
