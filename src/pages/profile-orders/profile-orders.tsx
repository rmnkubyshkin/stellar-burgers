import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds } from '../../services/feedSlice';
import { getOrders } from '../../services/ordersSlice';
import { AppDispatch, RootState } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const _fetchOrders = async () => {
      try {
        await dispatch(getOrders())
          .unwrap()
          .then((r) => console.log('orders_1:', orders));
      } catch (error) {
        console.error('Failed to get feed:', error);
      }
    };
    _fetchOrders().then((r) => console.log('orders_2:', orders));
  }, [dispatch]);
  //const orders: TOrder[] = [];
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );
  return <ProfileOrdersUI orders={orders} />;
};
