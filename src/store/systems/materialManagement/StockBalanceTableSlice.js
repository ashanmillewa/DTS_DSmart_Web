import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StockBalanceTableService from 'src/store/service/StockBalanceTableService';

export const fetchStockBalanceDetails = createAsyncThunk(
  'stockBalance/fetchStockBalanceDetails',
  async ({ startDate, endDate }) => {
    const data = await StockBalanceTableService.fetchStockBalanceDetails(startDate, endDate);
    return data;
  }
);

const stockBalanceTableSlice = createSlice({
  name: 'stockBalance',
  initialState: {
    stockBalances: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockBalanceDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockBalanceDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stockBalances = action.payload;
      })
      .addCase(fetchStockBalanceDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default stockBalanceTableSlice.reducer;
