import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { selectLoginStatus } from './store/login/selectors';

import './App.css';

const App = () => {
  const LoginStatus = useSelector(selectLoginStatus);
  return <div className="App">{LoginStatus ? <MainPage /> : <LoginPage />}</div>;
};
export default App;
