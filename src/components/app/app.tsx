import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  AppHeader,
  FeedInfo,
  IngredientDetails,
  Modal,
  OrderInfo
} from '@components';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { Preloader } from '@ui';
import { checkUserAuth, getUser } from '../../services/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const isAuthChecked = useSelector(
    (state: RootState) => state.user.isAuthChecked
  );
  const user = useSelector((state: RootState) => state.user.user);
  const _getUser = async () => await dispatch(checkUserAuth()).unwrap();
  _getUser();
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user.email && !user.name) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};

const App = () => {
  const navigate = useNavigate();
  const handleCloseIngredient = () => {
    navigate('/');
  };
  const handleCloseFeed = () => {
    navigate('/feed');
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/login'
          element={
            //<ProtectedRoute>
            <Login />
            //</ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            //<ProtectedRoute>
            <Register />
            //</ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='OrderInfo'
              onClose={() => {
                handleCloseFeed();
              }}
              children={<OrderInfo />}
            />
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='OrderInfo'
              onClose={() => {
                handleCloseIngredient();
              }}
              children={<OrderInfo />}
            />
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='IngredientDetails'
              onClose={() => {
                handleCloseIngredient();
              }}
              children={<IngredientDetails />}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
