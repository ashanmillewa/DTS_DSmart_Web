import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import ReorderLevelService from 'src/store/service/recorderLevelService';
import ReorderLevelService from '../../../store/service/recorderLevelService';

const initialState = {
  reorderLevels: [],
  status: 'idle',
  error: null,
};

export const GetReorderLevelDetails = createAsyncThunk(
  '/Admin/ReportingDetails/LoadReorderLRDetails',
  async (thunkAPI) => {
    try {
      const response = await ReorderLevelService.GetReorderLevelDetails();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);


const reorderLevelSlice = createSlice({
  name: 'reorderLevel',
  initialState,
  extraReducers: {
    [GetReorderLevelDetails.fulfilled]: (state, action) => {
      state.reorderLevels = action.payload;
    },
    [GetReorderLevelDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },

  },
});




export default reorderLevelSlice.reducer;
