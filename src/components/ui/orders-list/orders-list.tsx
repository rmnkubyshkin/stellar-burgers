import { FC } from 'react';
import styles from './orders-list.module.css';
import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';
import { Link, useLocation } from 'react-router-dom';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => {
  const location = useLocation();
  location.pathname;
  console.log('location:', location);
  return (
    <div className={`${styles.content}`}>
      {orderByDate.map((order) => (
        <Link
          key={order._id}
          to={
            location.pathname == '/profile/orders'
              ? `/profile/orders/${order.number}`
              : `/feed/${order.number}`
          }
          state={{ backgroundLocation: location }}
        >
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
};
