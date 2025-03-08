import { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { setCookingItems } from '../../services/cookingSlice';
import { useAppDispatch } from '../../services/hooks/hooks';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    useEffect(() => {
      count += 1;
    }, [dispatch]);
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
