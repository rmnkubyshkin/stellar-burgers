import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  CookingItemsType,
  handleOrderRequest
} from '../../services/cookingSlice';
import { useNavigate } from 'react-router-dom';
import { pushOrder } from '../../services/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const orderModalData: TOrder | null = useSelector(
    (state: RootState) => state.order.order
  );
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const items: CookingItemsType = useSelector(
    (state: RootState) => state.cook.cookingItems
  );
  const elementsOfOrder: string[] = [];

  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [orderReq, setOrderReq] = useState<boolean>(false);
  let response;
  function onOrderClick() {
    items.ingredients.forEach((el) => {
      elementsOfOrder.push(el._id);
    });
    elementsOfOrder.push(items.bun._id);
    const _pushOrder = async () => {
      elementsOfOrder &&
        (response = await dispatch(pushOrder(elementsOfOrder)).unwrap());
    };
    _pushOrder();
    if (!items.bun || orderReq) return;
  }
  const closeOrderModal = () => {
    navigate('/');
  };
  useEffect(() => {
    if (orderModalData && orderModalData._id) {
      setOrderReq(orderRequest);
      console.log('orderRequest:', orderReq);
      setOrderData(orderModalData);
      console.log('orderData:', orderData);
    }
  }, [orderModalData, orderRequest]);

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
      orderRequest={orderReq}
      constructorItems={items}
      orderModalData={orderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
