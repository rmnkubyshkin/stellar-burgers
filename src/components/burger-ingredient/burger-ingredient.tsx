import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  setConstructorItems,
  orderModalData,
  handleOrderRequest
} from '../../services/constructorSlice';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { TIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    const _constructorItems = useSelector(
      (state: RootState) => state.constructor.constructorItems
    );
    console.log('constructorItems: ', _constructorItems);
    const ing = {
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };
    const handleAdd = () => {
      console.log('ingredient was added!');
      const payload = {
        count: { value: 1 },
        ingredients: [ing]
      };
      console.log('payload: ', payload);
      dispatch(setConstructorItems(payload));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
