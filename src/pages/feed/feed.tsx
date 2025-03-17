import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds } from '../../services/slices/feedSlice/feedSlice';
import { AppDispatch, RootState } from '../../services/store/store';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.feed.feed.orders
  );
  const [feed, setFeed] = useState<TOrder[]>([]);
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        await dispatch(getFeeds()).unwrap();
      } catch (error) {
        console.error('Failed to fetch feed:', error);
      }
    };
    fetchFeed();
  }, [dispatch]);

  useEffect(() => {
    setFeed(orders);
  }, [orders]);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={feed}
      handleGetFeeds={() => {
        dispatch(getFeeds()).unwrap();
      }}
    />
  );
};
