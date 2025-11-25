import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedUser } from '../types';
import { getToken, getUser, setToken, setUser, removeToken, removeUser } from '../utils/token';

interface AuthState {
  token: string | null;
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: getToken(),
  user: getUser(),
  isAuthenticated: !!getToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<{ token: string; user: AuthenticatedUser }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      setToken(action.payload.token);
      setUser(action.payload.user);
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      removeToken();
      removeUser();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

