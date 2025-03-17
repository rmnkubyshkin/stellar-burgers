import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import { registerUser } from '../../services/slices/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const _register = async () =>
      await dispatch(registerUser({ email, name, password })).unwrap();
    _register().then((r) => {
      r.success ? navigate('/login') : navigate('/');
    });
    console.log('userName: ', name);
    console.log('email: ', email);
    console.log('password: ', password);
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
    />
  );
};
