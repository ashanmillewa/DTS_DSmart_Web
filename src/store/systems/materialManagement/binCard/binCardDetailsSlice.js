import { createSlice } from '@reduxjs/toolkit';
import BinCardDetailsService from 'src/store/service/BinCardDetailsService';

const initialState = {
  binCardDetails: [],
  binCardDetailSearch: '',
  binCardDetailSave: '',
  error: '',
};

export const binCardDetailsSlice = createSlice({
  name: 'binCardDetails',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getBinCardDetails: (state, action) => {
      state.binCardDetails = action.payload;
    },
    SearchBinCardDetail: (state, action) => {
      state.binCardSearch = action.payload;
    },
    saveBinCardDetail: (state, action) => {
      state.binCardSave = action.payload;
    },
  },
});


export const { hasError, getBinCardDetails, SearchBinCardDetail } = binCardDetailsSlice.actions;


export const fetchBinCardDetails = (MaterialCode,LocationCode) => async (dispatch) => {
  try {
    const response = await BinCardDetailsService.GetBinCardDetails(MaterialCode,LocationCode);
    dispatch(getBinCardDetails(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};



export default binCardDetailsSlice.reducer;

