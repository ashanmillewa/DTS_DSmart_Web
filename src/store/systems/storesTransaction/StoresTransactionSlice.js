import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StoresTransactionService from 'src/store/service/StoresTransactionService';

const initialState = {
  storesTransactions: [],
  storesTransactionDetails: [],
  storesTransactionSave: '',
  storesTransactionSearch: '',
  error: '',
};

export const GetStoresTransactions = createAsyncThunk(
  '/Admin/StTransactions/LoadStoresTransactionData(startDate,endDate)',
  async ({startDate,endDate}, thunkAPI) => {
    try {
      const response = await StoresTransactionService.GetStoresTransactions(startDate,endDate);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  },
);


export const GetStoresTransactionDetails = createAsyncThunk(
  '/Admin/StTransactions/LoadStoresTransactionData(startDate,endDate)',
  async (startDate,endDate, thunkAPI) => {
    try {
      const response = await StoresTransactionService.GetStoresTransactionDetails(startDate,endDate);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  },
);

const StoresTransactionSlice = createSlice({
  name: 'StoresTransaction',
  initialState,
  reducers: {
    searchStoresTransaction(state, action) {
      state.storesTransactionSearch = action.payload;
    },
    saveStoresTransaction(state, action) {
      state.storesTransactionSave = action.payload;
    },
  },
  extraReducers: {
    [GetStoresTransactions.fulfilled]: (state, action) => {
      state.storesTransactions = action.payload.resultSet;
    },
    [GetStoresTransactions.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [GetStoresTransactionDetails.fulfilled]: (state, action) => {
      state.storesTransactionDetails = action.payload;
    },
    [GetStoresTransactionDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { searchStoresTransaction, saveStoresTransaction } = StoresTransactionSlice.actions;

export default StoresTransactionSlice.reducer;
