import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState } from '../../services/store/store';
import { useSelector } from 'react-redux';
import {
  CookingItemsType,
  removeCookingItem,
  resetCookingItems
} from '../../services/slices/cookingSlice/cookingSlice';
import { useNavigate } from 'react-router-dom';
import {
  pushOrder,
  resetOrder
} from '../../services/slices/orderSlice/orderSlice';
import { getUser } from '../../services/slices/userSlice/userSlice';
import { useAppDispatch } from '../../services/hooks/hooks';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderModalData = useSelector((state: RootState) => state.order.order);
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const items: CookingItemsType = useSelector(
    (state: RootState) => state.cook.cookingItems
  );
  const elementsOfOrder: string[] = [];
  function onOrderClick() {
    const _getUser = async () => await dispatch(getUser()).unwrap();
    _getUser().then((r) => {
      if (r.success) {
        items.ingredients.forEach((el) => {
          elementsOfOrder.push(el._id);
        });
        items.bun && elementsOfOrder.push(items.bun._id);
        const _pushOrder = async () =>
          await dispatch(pushOrder(elementsOfOrder)).unwrap();
        _pushOrder();
      } else {
        navigate('/login');
      }
    });
    if (!items.bun || orderRequest) return;
  }
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetCookingItems());
  };

  const price = useMemo(() => {
    const bunPrice = items.bun ? items.bun.price * 2 : 0;
    const itemsPrice = items
      ? items.ingredients.reduce((s: number, v: TIngredient) => s + v.price, 0)
      : 0;
    return bunPrice + itemsPrice;
  }, [items]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={items}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
