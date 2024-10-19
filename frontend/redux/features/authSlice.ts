import { User } from '@/typings';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

const initialState = {
	isAuthenticated: false,
  isLoading: true,
  user: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, setUser, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;
