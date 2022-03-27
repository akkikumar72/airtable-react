import { createSlice, createStore, PayloadAction } from '@reduxjs/toolkit';
import { STATUSES } from '../../constants/index';
import { AuthState } from './types';

const initialState: AuthState = {
  status: STATUSES.INITIAL,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setLogin } = userSlice.actions;
export default userSlice.reducer;
