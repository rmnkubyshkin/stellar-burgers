import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
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
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
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
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />}>
          <Route
            path='/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
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
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
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
