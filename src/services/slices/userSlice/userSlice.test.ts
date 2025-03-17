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
    describe('Состояние загрузки при регистрации', () => {
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

    describe('Успешная регистрация пользователя', () => {
      it('Должен корректно обрабатывать успешную регистрацию', async () => {
        (
          registerUserApi as jest.MockedFunction<typeof registerUserApi>
        ).mockResolvedValueOnce(mockApiResponse);

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

    describe('Обработка ошибки при регистрации', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedRegisterUserApi.mockRejectedValueOnce({ message: undefined });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(registerUser(mockRegisterData));

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe(undefined);
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
      });
    });
  });

  describe('Асинхронный редьюсер loginUser', () => {
    const mockedLoginUserApi = loginUserApi as jest.MockedFunction<
      typeof loginUserApi
    >;
    describe('Успешный логин пользователя', () => {
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
    describe('Состояние загрузки при логине', () => {
      it('Должен корректно обрабатывать состояние загрузки при логине', () => {
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

    describe('Обработка ошибки при логине', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedLoginUserApi.mockRejectedValueOnce({
          message: undefined
        });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(loginUser(mockLoginData));

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe(undefined);
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
      });
    });
  });

  describe('Асинхронный редьюсер updateUser', () => {
    const mockedUpdateUserApi = updateUserApi as jest.MockedFunction<
      typeof updateUserApi
    >;
    describe('Состояние загрузки при обновлении', () => {
      it('Должен корректно обрабатывать состояние загрузки', () => {
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

    describe('Успешное обновление пользователя', () => {
      it('Должен корректно обрабатывать успешное обновление пользователя', async () => {
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

    describe('Обработка ошибки при обновлении', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedUpdateUserApi.mockRejectedValueOnce({ message: undefined });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(updateUser(mockRegisterData));

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe(undefined);
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
      });
    });
  });

  describe('Асинхронный редьюсер resetPassword', () => {
    const mockedResetPasswordApi = resetPasswordApi as jest.MockedFunction<
      typeof resetPasswordApi
    >;

    describe('Состояние загрузки при сбросе пароля', () => {
      it('Должен корректно обрабатывать состояние загрузки', () => {
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

    describe('Успешный сброс пароля', () => {
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

    describe('Обработка ошибки при сбросе пароля', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedResetPasswordApi.mockRejectedValueOnce({ message: undefined });

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
        expect(state.loginUserError).toBe(undefined);
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });

  describe('Асинхронный редьюсер logoutUser', () => {
    const mockedLogoutApi = logoutApi as jest.MockedFunction<typeof logoutApi>;

    describe('Обработка ошибки при выходе из системы', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedLogoutApi.mockRejectedValueOnce({ message: undefined });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(logoutUser());
        const state = store.getState().user;

        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe(undefined);
        expect(state.isAuthChecked).toBe(true);
      });
    });

    describe('Успешный выход из системы', () => {
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

    describe('Обработка ошибки при выходе из системы', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedLogoutApi.mockRejectedValueOnce({ message: undefined });
        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe(undefined);
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });

  describe('Асинхронный редьюсер refreshTokens', () => {
    const mockedRefreshToken = refreshToken as jest.MockedFunction<
      typeof refreshToken
    >;

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe('Состояние загрузки при обновлении токенов', () => {
      it('Должен корректно обрабатывать состояние загрузки', () => {
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

    describe('Успешное обновление токенов', () => {
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

        // Диспатчим действие refreshTokens
        await store.dispatch(refreshTokens());

        // Получаем текущее состояние
        const state = store.getState().user;

        // Проверяем, что состояние обновилось
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.loginUserError).toBeNull();

        // Проверяем, что токены сохранены
        expect(localStorage.getItem('refreshToken')).toBe('newRefreshToken');
        // Проверяем, что куки установлены (если используется библиотека для работы с куками)
      });
    });

    describe('Обработка ошибки при обновлении токенов', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedRefreshToken.mockRejectedValueOnce({ message: undefined });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(refreshTokens());
        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe(undefined);
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });

  describe('Асинхронный редьюсер getUser', () => {
    const mockedGetUserApi = getUserApi as jest.MockedFunction<
      typeof getUserApi
    >;

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe('Состояние загрузки при получении данных пользователя', () => {
      it('Должен корректно обрабатывать состояние загрузки', () => {
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

    describe('Успешное получение данных пользователя', () => {
      it('Должен корректно обрабатывать успешное получение данных', async () => {
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

    describe('Обработка ошибки при получении данных пользователя', () => {
      it('Должен корректно обрабатывать ошибку', async () => {
        mockedGetUserApi.mockRejectedValueOnce({ message: undefined });

        const store = configureStore({
          reducer: {
            user: reducer
          }
        });

        await store.dispatch(getUser());
        const state = store.getState().user;
        expect(state.loginUserRequest).toBe(false);
        expect(state.loginUserError).toBe(undefined);
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
