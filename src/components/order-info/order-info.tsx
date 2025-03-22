import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientSlice/ingredientsSlice';
import { RootState } from '../../services/store/store';
import { getFeeds } from '../../services/slices/feedSlice/feedSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIdFromPathname } from '../../utils/general';
import { useAppDispatch } from '../../services/hooks/hooks';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.data
  );
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.feed.feed.orders
  );
  const idOrder = getIdFromPathname(location.pathname);
  let orderData: TOrder | null = {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  };
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

  orders &&
    useEffect(() => {
      const fetchFeed = async () => {
        try {
          await dispatch(getFeeds()).unwrap();
        } catch (error) {
          console.error('Failed to get feed:', error);
        }
      };
      fetchFeed();
    }, [dispatch]);
  const [_orders, setOrders] = useState<TOrder[]>();
  const [_orderData, setOrdersData] = useState<TOrder>();

  useEffect(() => {
    setOrders(orders);
    orderData =
      _orders && idOrder
        ? _orders.filter((order) => order.number === Number(idOrder))[0]
        : null;
    orderData ? setOrdersData(orderData) : null;
  }, [orders]);

  const orderInfo = useMemo(() => {
    if (!_orderData || !ingredients.length) return null;
    const date = new Date(_orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = _orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ..._orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);
  const handleCloseFeed = () => {
    navigate('/feed');
  };
  if (!orderInfo) {
    return <Preloader />;
  }
  return <OrderInfoUI orderInfo={orderInfo} />;
};
