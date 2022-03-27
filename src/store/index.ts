import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login';
import airTableReducer from './airtableApp';

const store = configureStore({
  reducer: {
    login: loginReducer,
    airTable: airTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
