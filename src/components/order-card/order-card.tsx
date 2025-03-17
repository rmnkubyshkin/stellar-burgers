import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientSlice/ingredientsSlice';
import { RootState, AppDispatch } from '../../services/store/store';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.data
  );
  const dispatch: AppDispatch = useDispatch();
  ingredients &&
    useEffect(() => {
      const fetchIngredients = async () => {
        try {
          await dispatch(getIngredients()).unwrap();
        } catch (error) {
          console.error('Failed to fetch ingredients:', error);
        }
      };
      fetchIngredients();
    }, [dispatch]);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
