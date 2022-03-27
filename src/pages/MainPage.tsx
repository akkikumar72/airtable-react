import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { airTableDashboardStatus } from '../store/airtableApp/selectors';
import { setLogin } from '../store/login';
import { STATUSES } from '../constants';
import ClassInfoCard from '../components/ClassInfoCard';
import LoadingScreen from '../components/loadingScreen';

const MainPage = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(airTableDashboardStatus) !== STATUSES.FULFILLED;

  const LogOut = () => {
    dispatch(setLogin(false));
  };

  return (
    <>
      {isPending ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <div className="header">
            <div className="header-logout">
              <button onClick={LogOut} type="button">
                Log Out
              </button>
            </div>
          </div>
          <div className="header-title">
            <h1>Class Record</h1>
          </div>
          <div className="main-content">
            <ClassInfoCard />
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
