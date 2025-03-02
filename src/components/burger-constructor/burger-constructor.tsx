import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConstructorItems,
  getModalData,
  getOrderRequest,
  handleOrderRequest
} from '../../services/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch: AppDispatch = useDispatch();

  const _orderRequest: boolean = useSelector(
    (state: RootState) => state.constructor.orderRequest
  );
  const _orderModalData: TOrder | null = useSelector(
    (state: RootState) => state.constructor.orderModalData
  );
  const _constructorItems = useSelector(
    (state: RootState) => state.constructor.constructorItems
  );

  const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
