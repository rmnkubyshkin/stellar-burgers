import { FC, memo, useEffect } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector } from 'react-redux';
import {
  CookingItemsType,
  handleMoveDownIngredient,
  handleMoveUpIngredient,
  removeCookingItem
} from '../../services/slices/cookingSlice/cookingSlice';
import { RootState } from '../../services/store/store';
import { useAppDispatch } from '../../services/hooks/hooks';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const handleMoveDown = () => {
      dispatch(handleMoveDownIngredient({ ingredient, totalItems }));
    };
    const handleMoveUp = () => {
      dispatch(handleMoveUpIngredient(ingredient));
    };

    const handleClose = () => {
      dispatch(removeCookingItem(ingredient));
    };
    return (
      <div data-testid='burger-constructor-element'>
        <BurgerConstructorElementUI
          ingredient={ingredient}
          index={index}
          totalItems={totalItems}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleClose={handleClose}
        />
      </div>
    );
  }
);
