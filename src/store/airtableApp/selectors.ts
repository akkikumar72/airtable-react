import { RootState } from '../index';

export const airTableDashboardStatus = (state: RootState) => state.airTable.status;

export const airTableDashboardData = (state: RootState) => state.airTable.info;
