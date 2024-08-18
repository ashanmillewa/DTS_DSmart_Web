import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setMessage } from '../../apps/message';
import BinCardService from 'src/store/service/BinCardService';

const initialState = {
  binCards: [],
  binCardSearch: '',
  binCardSave: '',
  error: '',
};

export const GetBinCardDetails = createAsyncThunk(
  '/Admin/BinCardDetails/GetBinMatDetails',
  async (thunkAPI) => {
    try {
      const response = await BinCardService.GetBinCardDetails();
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  }
);

const binCardSlice = createSlice({
  name: 'binCard',
  initialState,
  reducers: {
    searchBinCard(state, action) {
      state.binCardSearch = action.payload;
    },
    saveBinCard(state, action) {
      state.binCardSave = action.payload;
    }
  },
  extraReducers: {
    [GetBinCardDetails.fulfilled]: (state, action) => {
      state.binCards = action.payload;
    },
    [GetBinCardDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },

  },
});

export const { searchBinCard, saveBinCard } = binCardSlice.actions;

export default binCardSlice.reducer;
