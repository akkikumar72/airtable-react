import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AirtableAppState, ClassInfoWithStudents } from './types';
import { getClassInfo } from './actions';
import { STATUSES } from '../../constants';

const initialState: AirtableAppState = {
  status: STATUSES.INITIAL,
  info: [],
};

export const AirtableApp = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getClassInfo.fulfilled.type,
        (state: AirtableAppState, actions: PayloadAction<Array<ClassInfoWithStudents>>) => {
          state.status = STATUSES.FULFILLED;
          state.info = actions.payload;
        },
      )
      .addCase(getClassInfo.pending, (state: AirtableAppState) => {
        state.status = STATUSES.PENDING;
      })
      .addCase(getClassInfo.rejected.type, (state: AirtableAppState) => {
        state.status = STATUSES.REJECTED;
      });
  },
});
export default AirtableApp.reducer;
