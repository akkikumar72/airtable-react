import { RootState } from '../index';
export const selectLoginStatus = (state: RootState) => state.login.isAuthenticated;
