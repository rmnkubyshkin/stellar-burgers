import { TLoginData, TRegisterData, loginUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export type UserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser;
  loginUserError: string | null | undefined;
  loginUserRequest: boolean;
};

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: {
    email: '',
    name: ''
  },
  loginUserError: null,
  loginUserRequest: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) =>
    await loginUserApi({ email, password })
);

//Реализовали слайс и добавили его в рут редьюс, надо вызывать

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        console.log('r:', state.user);
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    selectUser: (state: UserState) => state.user
  }
});

export default userSlice.reducer;
export const { selectUser } = userSlice.selectors;
