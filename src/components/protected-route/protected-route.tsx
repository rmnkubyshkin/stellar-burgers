import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store/store';
import { Preloader } from '@ui';
import { getUser } from '../../services/slices/userSlice/userSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/hooks/hooks';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthChecked = useSelector(
    (state: RootState) => state.user.isAuthChecked
  );
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    const _getUser = async () => await dispatch(getUser()).unwrap();
    _getUser().then((r) => {
      if (r.success === true) {
        navigate('/profile');
      } else {
        navigate('/login');
      }
    });
    //async () => await dispatch(getUser()).unwrap();
  }, [dispatch]);

  if (!isAuthChecked) {
    return <Preloader />;
  }
  // if (!onlyUnAuth && !user.email && !user.name) {
  //   return <Navigate replace to='/login' state={{ from: location }} />;
  // }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
