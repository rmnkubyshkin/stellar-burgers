import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import {
  getUser,
  loginUser,
  refreshTokens
} from '../../services/slices/userSlice/userSlice';
import { AppDispatch } from '../../services/store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/utils/cookie';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const _getUser = async () => await dispatch(getUser()).unwrap();
    _getUser().then((r) => {
      if (r.success == true) {
        navigate('/profile');
      } else {
        const _loginUser = async () =>
          await dispatch(loginUser({ email, password })).unwrap();
        _loginUser().then((r) => {
          console.log('r:', r);
          r.success === true ? navigate('/profile') : navigate('/register');
        });
      }
    });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
