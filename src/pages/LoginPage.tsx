import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getClassInfo } from '../store/airtableApp/actions';
import { airTableDashboardData, airTableDashboardStatus } from '../store/airtableApp/selectors';
import { setLogin } from '../store/login';

const LoginPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(setLogin(true));
    dispatch(getClassInfo(data.StudentName));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Student Name</label>
      <input
        {...register('StudentName', {
          required: true,
          maxLength: 20,
        })}
      />
      {errors.StudentName && <span>This field is required</span>}
      {errors.StudentName && errors.StudentName.type === 'maxLength' && (
        <span>Max length is 20</span>
      )}
      <input type="submit" />
    </form>
  );
};

export default LoginPage;
