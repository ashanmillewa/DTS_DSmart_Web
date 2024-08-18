import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import StockBalanceService from 'src/store/service/StockBalanceService';
// const API_URL = '/api/data/employee/EmployeeData';

const initialState = {
  stockBalances: [],
  stockBalanceSearch: '',
  stockBalanceSave: '',
  error: '',
};
export const stockBalanceSlice = createSlice({
  name: 'stockBalance',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getStockBalances: (state, action) => {
      state.stockBalances = action.payload;
    },
    SearchStockBalance: (state, action) => {
      state.stockBalanceSearch = action.payload;
    },
    saveStockBalance: (state, action) => {
      state.stockBalanceSave = action.payload;
    },
  },
});
export const { hasError, getStockBalances, SearchStockBalance } = stockBalanceSlice.actions;

// export const fetchEmployees = () => async (dispatch) => {
//   try {
//     return await EmployeeService.GetEmployeeDetails().then(
//       (response) => {
//         dispatch(getEmployees(response.data.resultSet));
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response && error.data && error.data.message) || error.message || error.toString();
//         return Promise.reject();
//       },
//     );
//   } catch (error) {
//     dispatch(hasError(error));
//   }
// };



export const fetchStockBalances = () => async (dispatch) => {
  try {
    const response = await StockBalanceService.GetStockBalance();
    dispatch(getStockBalances(response.data.resultSet));

  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};


export default stockBalanceSlice.reducer;

