import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  setCookingItems,
  handleOrderModalData,
  handleOrderRequest,
  CookingItemsType
} from '../../services/cookingSlice';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { TIngredient } from '@utils-types';
import { selectIngredients } from 'src/services/ingredientsSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const selectIngredients: CookingItemsType = useSelector(
      (state: RootState) => state.cook.cookingItems
    );
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const handleAdd = () => {
      dispatch(setCookingItems(ingredient));
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
