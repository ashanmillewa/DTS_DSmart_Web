import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SupplierService from 'src/store/service/SupplierService';
import { setMessage } from '../../apps/message';

export const PostSupplierDetails = createAsyncThunk(
  'Admin/SupplierManagement/PostSupplierDetails"',
  async (data, thunkAPI) => {
    try {
      let formData = JSON.stringify(data);
      const response = await SupplierService.PostSupplierDetails(formData);
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
      thunkAPI.dispatch(GetSupplierDetails());
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'Supplier Saved Successfully', alertType: 'success' }),
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

export const GetSupplierDetails = createAsyncThunk(
  'Admin/SupplierManagement/GetSupplierDetails',
  async (thunkAPI) => {
    try {
      const response = await SupplierService.GetSupplierDetails();
      if (response.statusCode !== 200) {
        return thunkAPI.rejectWithValue();
      }
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

export const GetSupplierDetailsById = createAsyncThunk(
  'Admin/SupplierManagement/GetSupplierDetailsById',
  async (id, thunkAPI) => {
    try {
      const response = await SupplierService.GetSupplierDetailsById(id);
      if (response.statusCode !== 200) {
        return thunkAPI.rejectWithValue();
      }
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

const initialState = { supData: [], loading: false ,supDataList:[]};

const SupplierSlice = createSlice({
  name: 'SupplierSlice',
  initialState,
  extraReducers: {
    [PostSupplierDetails.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostSupplierDetails.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSupplierDetails.fulfilled]: (state, action) => {
      state.supDataList = action.payload.resultSet;
      state.loading = false;
    },
    [GetSupplierDetails.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSupplierDetailsById.fulfilled]: (state, action) => {
      state.supData = action.payload.resultSet;
      state.loading = false;
    },
    [GetSupplierDetailsById.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = SupplierSlice;
export default reducer;
