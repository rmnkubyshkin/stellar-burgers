import { configureStore } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  resetPasswordApi,
  TAuthResponse,
  TRegisterData,
  updateUserApi
} from '@api';
import reducer, {
  getUser,
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
  resetPassword,
  updateUser
} from './userSlice';
import { TUser } from '@utils-types';

jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  resetPasswordApi: jest.fn(),
  logoutApi: jest.fn(),
  refreshToken: jest.fn(),
  getUserApi: jest.fn()
}));

const mockUser: TUser = {
  email: 'test44@example.com',
  name: 'Test_User_44'
};

const mockLoginData = {
  email: 'test44@example.com',
  password: 'password123'
};

const mockRegisterData: TRegisterData = {
  email: 'test45@example.com',
  name: 'Test_User_44',
  password: 'password123'
};

const mockApiResponse: TAuthResponse = {
  success: true,
  user: mockUser,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

describe('Тесты для userSlice', () => {
  describe('Асинхронный редьюсер registerUser', () => {
    const mockedRegisterUserApi = registerUserApi as jest.MockedFunction<
      typeof registerUserApi
    >;

    describe('Тестирование registerUser.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки', () => {
        mockedRegisterUserApi.mockImplementationOnce(
          () => new Promise(() => {})
        );
        const store = configureStore({
          reducer: {
            user: reducer
          }
        });
        store.dispatch(registerUser(mockRegisterData));
        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование registerUser.fulfilled', () => {
      it('Должен корректно обрабатывать успешную регистрацию', async () => {
        mockedRegisterUserApi.mockResolvedValueOnce(mockApiResponse);

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(registerUser(mockRegisterData));

        const state = store.getState().user;
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBeNull();
        expect(registerUserApi).toHaveBeenCalledTimes(1);
        expect(registerUserApi).toHaveBeenCalledWith(mockRegisterData);
      });
    });

    describe('Тестирование registerUser.rejected', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedRegisterUserApi.mockRejectedValueOnce({
          message: 'Ошибка регистрации'
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(registerUser(mockRegisterData));

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe('Ошибка регистрации');
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
      });
    });
  });

  describe('Асинхронный редьюсер loginUser', () => {
    const mockedLoginUserApi = loginUserApi as jest.MockedFunction<
      typeof loginUserApi
    >;

    describe('Тестирование loginUser.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки', () => {
        mockedLoginUserApi.mockImplementationOnce(() => new Promise(() => {}));

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        store.dispatch(loginUser(mockLoginData));

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование loginUser.fulfilled', () => {
      it('Должен корректно обрабатывать успешный логин', async () => {
        mockedLoginUserApi.mockResolvedValueOnce(mockApiResponse);

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(loginUser(mockLoginData));

        const state = store.getState().user;
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBeNull();
        expect(loginUserApi).toHaveBeenCalledTimes(1);
        expect(loginUserApi).toHaveBeenCalledWith(mockLoginData);
      });
    });

    describe('Тестирование loginUser.rejected', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedLoginUserApi.mockRejectedValueOnce({
          message: 'Ошибка логирования'
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(loginUser(mockLoginData));

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe('Ошибка логирования');
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
      });
    });
  });

  describe('Асинхронный редьюсер updateUser', () => {
    const mockedUpdateUserApi = updateUserApi as jest.MockedFunction<
      typeof updateUserApi
    >;

    describe('Тестирование updateUser.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки при обновлении данных пользователя', () => {
        mockedUpdateUserApi.mockImplementationOnce(() => new Promise(() => {}));

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        store.dispatch(updateUser(mockRegisterData));

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование updateUser.fulfilled', () => {
      it('Должен корректно обрабатывать успешное обновление данных пользователя', async () => {
        mockedUpdateUserApi.mockResolvedValueOnce(mockApiResponse);

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(updateUser(mockRegisterData));

        const state = store.getState().user;
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBeNull();
        expect(updateUserApi).toHaveBeenCalledTimes(1);
        expect(updateUserApi).toHaveBeenCalledWith(mockRegisterData);
      });
    });

    describe('Тестирование updateUser.rejected', () => {
      it('Должен корректно обрабатывать ошибку при обновлении данных пользователя', async () => {
        mockedUpdateUserApi.mockRejectedValueOnce({
          message: 'Ошибка обновления'
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(updateUser(mockRegisterData));

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe('Ошибка обновления');
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
      });
    });
  });

  describe('Асинхронный редьюсер resetPassword', () => {
    const mockedResetPasswordApi = resetPasswordApi as jest.MockedFunction<
      typeof resetPasswordApi
    >;

    describe('Тестирование resetPassword.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки при сбросе пароля', () => {
        mockedResetPasswordApi.mockImplementationOnce(
          () => new Promise(() => {})
        );

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        store.dispatch(
          resetPassword({ password: 'newPassword', token: 'resetToken' })
        );

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование resetPassword.fulfilled', () => {
      it('Должен корректно обрабатывать успешный сброс пароля', async () => {
        mockedResetPasswordApi.mockResolvedValueOnce({ success: true });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(
          resetPassword({ password: 'newPassword', token: 'resetToken' })
        );

        const state = store.getState().user;
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthChecked).toBe(false);
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование resetPassword.rejected', () => {
      it('Должен корректно обрабатывать ошибку при сбросе пароля', async () => {
        mockedResetPasswordApi.mockRejectedValueOnce({
          message: 'Ошибка сброса пароля'
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(
          resetPassword({ password: 'newPassword', token: 'resetToken' })
        );

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe('Ошибка сброса пароля');
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });

  describe('Асинхронный редьюсер logoutUser', () => {
    const mockedLogoutApi = logoutApi as jest.MockedFunction<typeof logoutApi>;

    describe('Тестирование logoutUser.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки при выходе из системы', () => {
        mockedLogoutApi.mockImplementationOnce(() => new Promise(() => {}));

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование logoutUser.fulfilled', () => {
      it('Должен корректно обрабатывать успешный выход из системы', async () => {
        mockedLogoutApi.mockResolvedValueOnce({ success: true });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(state.user).toEqual({ email: '', name: '' });
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthChecked).toBe(true);
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование logoutUser.rejected', () => {
      it('Должен корректно обрабатывать ошибку при выходе из системы', async () => {
        mockedLogoutApi.mockRejectedValueOnce({
          message: 'Ошибка выхода из системы'
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe('Ошибка выхода из системы');
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });

  describe('Асинхронный редьюсер refreshTokens', () => {
    const mockedRefreshToken = refreshToken as jest.MockedFunction<
      typeof refreshToken
    >;

    describe('Тестирование refreshTokens.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки при обновлении токенов', () => {
        mockedRefreshToken.mockImplementationOnce(() => new Promise(() => {}));

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        store.dispatch(refreshTokens());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование refreshTokens.fulfilled', () => {
      it('Должен корректно обрабатывать успешное обновление токенов', async () => {
        mockedRefreshToken.mockResolvedValueOnce({
          success: true,
          accessToken: 'newAccessToken',
          refreshToken: 'newRefreshToken'
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(refreshTokens());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.loginUserError).toBeNull();
        expect(localStorage.getItem('refreshToken')).toBe('newRefreshToken');
      });
    });

    describe('Тестирование refreshTokens.rejected', () => {
      it('Должен корректно обрабатывать ошибку при обновлении токенов', async () => {
        mockedRefreshToken.mockRejectedValueOnce({
          message: 'Ошибка обновления токенов'
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(refreshTokens());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe('Ошибка обновления токенов');
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });

  describe('Асинхронный редьюсер getUser', () => {
    const mockedGetUserApi = getUserApi as jest.MockedFunction<
      typeof getUserApi
    >;

    describe('Тестирование getUser.pending', () => {
      it('Должен корректно обрабатывать состояние загрузки при получении данных пользователя', () => {
        mockedGetUserApi.mockImplementationOnce(() => new Promise(() => {}));

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        store.dispatch(getUser());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(true);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование getUser.fulfilled', () => {
      it('Должен корректно обрабатывать успешное получение данных пользователя', async () => {
        mockedGetUserApi.mockResolvedValueOnce({
          success: true,
          user: mockUser
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(getUser());

        const state = store.getState().user;
        expect(state.user).toEqual(mockUser);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.loginUserError).toBeNull();
      });
    });

    describe('Тестирование getUser.rejected', () => {
      it('Должен корректно обрабатывать ошибку при получении данных пользователя', async () => {
        mockedGetUserApi.mockRejectedValueOnce({
          message: 'Ошибка получения данных пользователя'
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(getUser());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe(
          'Ошибка получения данных пользователя'
        );
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
