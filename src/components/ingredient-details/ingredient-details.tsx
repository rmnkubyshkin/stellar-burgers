import { FC, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { getIdFromPathname } from '../../utils/general';

export const IngredientDetails: FC = () => {
  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.data
  );
  const location = useLocation();
  const id = getIdFromPathname(location.pathname);
  const ingredientData = id
    ? ingredients.filter((ingredient) => ingredient._id === id)[0]
    : null;
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
