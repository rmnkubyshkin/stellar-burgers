import { configureStore } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';
import reducer, {
  getFeeds,
  selectFeed,
  TFeedsResponseSlice
} from './feedSlice';
import { getFeedsApi } from '@api';

const mockApiResponse = {
  success: true,
  orders: [
    {
      createdAt: '2025-03-12T15:49:56.480Z',
      ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
      name: 'Флюоресцентный люминесцентный бургер',
      number: 70789,
      status: 'done',
      updatedAt: '2025-03-12T15:49:57.228Z',
      _id: '67d1ad24133acd001be57506'
    }
  ],
  total: 70415,
  totalToday: 114
};

jest.mock('@api', () => ({
  getFeedsApi: jest.fn(() => Promise.resolve(mockApiResponse))
}));

describe('Тесты для feedSlice', () => {
  describe('Асинхронный экшен getFeeds', () => {
    describe('Тестирование getFeeds.fullfiled', () => {
      it('Должен корректно обрабатывать успешную загрузку', async () => {
        const store = configureStore({
          reducer: {
            feed: reducer
          }
        });

        await store.dispatch(getFeeds());

        expect(store.getState().feed.feed).toEqual(
          mockApiResponse as TFeedsResponseSlice
        );

        expect(getFeedsApi).toHaveBeenCalledTimes(1);
      });
    });
    describe('Тестирование getFeeds.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки', async () => {
        const store = configureStore({
          reducer: {
            feed: reducer
          }
        });

        store.dispatch(getFeeds());

        expect(store.getState().feed).toEqual({
          feed: {
            orders: [],
            total: 0,
            totalToday: 0
          },
          loading: true,
          error: null
        });
      });
    });
    describe('Тестирование getFeeds.rejected', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        const errorMessage = 'Server error';
        (
          getFeedsApi as jest.MockedFunction<typeof getFeedsApi>
        ).mockRejectedValueOnce({
          message: errorMessage
        });

        const store = configureStore({
          reducer: {
            feed: reducer
          }
        });

        await store.dispatch(getFeeds());

        expect(store.getState().feed).toEqual({
          feed: {
            orders: [],
            total: 0,
            totalToday: 0
          },
          loading: false,
          error: errorMessage
        });
      });
    });
  });
  describe('Селекторы feedSlice', () => {
    describe('Селектор selectFeed', () => {
      it('Должен выбирать ингредиенты из стора', () => {
        const mockState = {
          feed: {
            feed: {
              orders: mockApiResponse.orders,
              total: mockApiResponse.total,
              totalToday: mockApiResponse.totalToday,
              success: true
            },
            loading: false,
            error: null
          }
        };
        const result = selectFeed(mockState);
        expect(result).toEqual(mockApiResponse);
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
