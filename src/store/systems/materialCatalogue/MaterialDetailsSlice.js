import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MaterialDetailsService from 'src/store/service/MaterialDetailsService';
import { setMessage } from '../../apps/message';
const initialState = {
  materialDetails: [],
  materialDetailsSave: '',
  materialDetailsSearch: '',
  error: '',
  loadUnits: [],
};

export const insertWarehouseEntry = createAsyncThunk(
  '/Admin/MaterialCatalogue/PostMaterialDetails',
  async (entryData, thunkAPI) => {
    try {
      const response = await MaterialDetailsService.insertWarehouseEntry(entryData);
      if (response.statusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.statusCode + ' ' + response.result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetLoadUnitsWHDetails());
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: 'Material Catalogue Added Successfully',
          alertType: 'success',
        }),
      );
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
  },
);
export const GetLoadUnitsWHDetails = createAsyncThunk(
  '/Admin/MaterialCatalogue/GetLoadUnitsWHDetails',
  async (_, thunkAPI) => {
    try {
      const response = await MaterialDetailsService.GetLoadUnitsWHDetails();
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
  },
);
const MaterialDetailsSlice = createSlice({
  name: 'MaterialDetails',
  initialState,
  reducers: {
    searchMaterial(state, action) {
      state.materialSearch = action.payload;
    },
    saveMaterial(state, action) {
      state.materialSave = action.payload;
    },
  },
  extraReducers: {
    [insertWarehouseEntry.fulfilled]: (state, action) => {
      state.materialSave = action.payload;
    },
    [insertWarehouseEntry.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [GetLoadUnitsWHDetails.fulfilled]: (state, action) => {
      state.loadUnits = action.payload;
    },
    [GetLoadUnitsWHDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { searchMaterial, saveMaterial } = MaterialDetailsSlice.actions;

export default MaterialDetailsSlice.reducer;
