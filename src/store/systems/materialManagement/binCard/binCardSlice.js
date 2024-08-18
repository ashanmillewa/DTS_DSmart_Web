import axios from '../../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import BinCardService from 'src/store/service/BinCardService';
// const API_URL = '/api/data/employee/EmployeeData';

const initialState = {
  binCards: [],
  binCardSearch: '',
  binCardSave: '',
  error: '',
};

export const binCardSlice = createSlice({
  name: 'binCard',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getBinCards: (state, action) => {
      state.binCards = action.payload;
    },
    SearchBinCard: (state, action) => {
      state.binCardSearch = action.payload;
    },
    saveBinCard: (state, action) => {
      state.binCardSave = action.payload;
    },
  },
});
export const { hasError, getBinCards, SearchBinCard } = binCardSlice.actions;

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



export const fetchBinCards = () => async (dispatch) => {
  try {
    const response = await BinCardService.GetBinCard();
    dispatch(getBinCards(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};


export default binCardSlice.reducer;

