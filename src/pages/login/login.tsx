import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUser, refreshTokens } from '../../services/userSlice';
import { AppDispatch } from '../../services/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const _loginUser = async () =>
      await dispatch(loginUser({ email, password })).unwrap();
    _loginUser().then(() => {
      async () =>
        await dispatch(refreshTokens())
          .unwrap()
          .then((r) => {
            r.success ? navigate('/profile') : navigate('/register');
          });
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
