import { jest } from '@jest/globals';
import { TIngredient } from '@utils-types';
import reducer, {
  handleMoveDownIngredient,
  handleMoveUpIngredient,
  initialState,
  removeCookingItem,
  selectCookingItems,
  selectCookingItemsError,
  selectCookingItemsLoading,
  setCookingItems
} from './cookingSlice';
import { error } from 'console';

const mockBun = {
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
};

const mockCookItems: TIngredient[] = [
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
];

const mockCookItem: TIngredient = {
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
};

describe('Тесты для cookingSlice', () => {
  describe('Редьюсер setCookingItems', () => {
    it('Должен корректно получать список ингредиентов для заказа', () => {
      const state = {
        ...initialState,
        ingredients: mockCookItem
      };
      const newState = reducer(state, setCookingItems(mockCookItem));
      expect(newState.cookingItems.ingredients).toEqual([mockCookItem]);
    });
  });

  describe('Редьюсер removeCookingItem', () => {
    describe('Экшн удаления ингредиента из заказа', () => {
      it('Должен удалить ингредиент из списка', () => {
        const state = {
          ...initialState,
          cookingItems: {
            bun: initialState.cookingItems.bun,
            ingredients: mockCookItems
          }
        };
        const newState = reducer(state, removeCookingItem(mockCookItem));
        expect(newState.cookingItems.ingredients).toEqual([
          mockCookItems[1],
          mockCookItems[2]
        ]);
      });
    });

    describe('Проверка что булки не удаляются из заказа', () => {
      it('Не должен удалять булку', () => {
        const state = {
          ...initialState,
          cookingItems: {
            bun: mockBun,
            ingredients: mockCookItems
          }
        };
        const newState = reducer(state, removeCookingItem(mockBun));
        expect(newState.cookingItems.ingredients).toEqual(mockCookItems);
      });
    });
  });

  describe('Редьюсер handleMoveUpIngredient', () => {
    describe('Перемещение ингредиента на одну позицию вверх', () => {
      it('Должен переместить ингредиент на одну позицию вверх', () => {
        const state = {
          ...initialState,
          cookingItems: {
            bun: initialState.cookingItems.bun,
            ingredients: mockCookItems
          }
        };

        const newState = reducer(
          state,
          handleMoveUpIngredient(mockCookItems[1])
        );

        expect(newState.cookingItems.ingredients).toEqual([
          mockCookItems[1],
          mockCookItems[0],
          mockCookItems[2]
        ]);
      });
    });

    describe('Проверка ограничения перемещения, если это первая позиция в сиписке', () => {
      it('Не должен перемещать ингредиент, если он уже на первой позиции', () => {
        const state = {
          ...initialState,
          cookingItems: {
            bun: initialState.cookingItems.bun,
            ingredients: mockCookItems
          }
        };

        const newState = reducer(
          state,
          handleMoveUpIngredient(mockCookItems[0])
        );
        expect(newState.cookingItems.ingredients).toEqual([
          mockCookItems[0],
          mockCookItems[1],
          mockCookItems[2]
        ]);
      });
    });
  });

  describe('Редьюсер handleMoveDownIngredient', () => {
    describe('Перемещение ингредиента на одну позицию вниз', () => {
      it('Должен переместить ингредиент на одну позицию вниз', () => {
        const state = {
          ...initialState,
          cookingItems: {
            bun: initialState.cookingItems.bun,
            ingredients: mockCookItems
          }
        };

        const newState = reducer(
          state,
          handleMoveDownIngredient({
            ingredient: mockCookItems[1],
            totalItems: mockCookItems.length
          })
        );

        expect(newState.cookingItems.ingredients).toEqual([
          mockCookItems[0],
          mockCookItems[2],
          mockCookItems[1]
        ]);
      });
    });

    describe('Проверка ограничения перемещения, если это последняя позиция в сиписке', () => {
      it('Не должен перемещать ингредиент, если он на последней позиции', () => {
        const state = {
          ...initialState,
          cookingItems: {
            bun: initialState.cookingItems.bun,
            ingredients: mockCookItems
          }
        };

        const newState = reducer(
          state,
          handleMoveDownIngredient({
            ingredient: mockCookItems[2],
            totalItems: mockCookItems.length
          })
        );
        expect(newState.cookingItems.ingredients).toEqual([
          mockCookItems[0],
          mockCookItems[1],
          mockCookItems[2]
        ]);
      });
    });
  });

  describe('Селекторы cookingSlice', () => {
    describe('Селектор selectCookingItems', () => {
      it('Должен выбирать текущие ингредиенты из Конструктора', () => {
        const mockState = {
          cook: {
            cookingItems: {
              bun: mockBun,
              ingredients: [mockCookItem]
            },
            loading: false,
            error: null
          }
        };

        const result = selectCookingItems(mockState);

        expect(result).toEqual({
          bun: mockBun,
          ingredients: [mockCookItem]
        });
      });
    });

    describe('Селектор selectCookingItemsLoading', () => {
      it('Должен возвращать статус загрузки', () => {
        const mockStateLoading = {
          cook: {
            cookingItems: {
              bun: null,
              ingredients: []
            },
            loading: true,
            error: null
          }
        };

        const mockStateNotLoading = {
          cook: {
            ...mockStateLoading.cook,
            loading: false
          }
        };

        expect(selectCookingItemsLoading(mockStateLoading)).toBe(true);
        expect(selectCookingItemsLoading(mockStateNotLoading)).toBe(false);
      });
    });

    describe('Селектор selectCookingItemsError', () => {
      it('Должен возвращать ошибку', () => {
        const mockErrorState = {
          cook: {
            cookingItems: {
              bun: null,
              ingredients: []
            },
            loading: false,
            error: 'Ошибка загрузки'
          }
        };

        const mockNoErrorState = {
          cook: {
            ...mockErrorState.cook,
            error: null
          }
        };

        expect(selectCookingItemsError(mockErrorState)).toBe('Ошибка загрузки');
        expect(selectCookingItemsError(mockNoErrorState)).toBeNull();
      });
    });
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
