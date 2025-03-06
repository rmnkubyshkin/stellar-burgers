import { FC, useEffect, useState } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'src/services/store';
import { getFeeds, TFeedsResponseSlice } from '../../services/feedSlice';
import { TFeedsResponse } from '@api';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const feed: TFeedsResponseSlice = useSelector(
    (state: RootState) => state.feed.feed
  );
  const _orders = feed.orders;

  const [_feed, setFeed] = useState<TFeedsResponseSlice>();
  useEffect(() => {
    const fetchFeed = async () => {
      await dispatch(getFeeds()).unwrap();
    };
    fetchFeed();
  }, [dispatch]);

  useEffect(() => {
    setFeed(feed);
  }, [feed]);
  const readyOrders = getOrders(_orders, 'done');
  const pendingOrders = getOrders(_orders, 'pending');
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
