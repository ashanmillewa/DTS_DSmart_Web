import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as MtnService from './MtnService';

// Initial state for the MTN slice
const initialState = {
  mtnDetails: null,
  additionalData: {
    originatedBy: [],
    projectNumbers: [],
    warehouseDetails: []
  },
  status: 'idle',
  error: null
};

// Async thunk to load MTN details
export const fetchMtnDetails = createAsyncThunk(
  'mtn/fetchMtnDetails',
  async (docNo) => {
    const response = await MtnService.loadMTNDetails(docNo);
    return response;
  }
);

// Async thunk to save MTN details
export const saveMtnDetails = createAsyncThunk(
  'mtn/saveMtnDetails',
  async (data) => {
    const response = await MtnService.saveMTNDetails(data);
    return response;
  }
);

// Async thunk to fetch additional data
export const fetchAdditionalData = createAsyncThunk(
  'mtn/fetchAdditionalData',
  async () => {
    const response = await MtnService.fetchAdditionalData();
    return response;
  }
);

// Create the MTN slice
const mtnSlice = createSlice({
  name: 'mtn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMtnDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMtnDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mtnDetails = action.payload;
      })
      .addCase(fetchMtnDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveMtnDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveMtnDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(saveMtnDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAdditionalData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdditionalData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.additionalData = action.payload;
      })
      .addCase(fetchAdditionalData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default mtnSlice.reducer;
