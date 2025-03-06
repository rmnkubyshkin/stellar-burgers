import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/userSlice';
import { AppDispatch } from '../../services/store';
import { useDispatch } from 'react-redux';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    console.log('shold logout');
    const _logout = async () => await dispatch(logoutUser()).unwrap();
    _logout();
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
