import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../apps/message';
import EmployeeService from 'src/store/service/EmployeeService';

export const PostEmployeeManDetails = createAsyncThunk(
  'Employee/PostEmployeeManDetails',
  async (data, thunkAPI) => {
    try {
      // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });
      let formData = JSON.stringify(data);
      const response = await EmployeeService.PostEmployeeManDetails(formData);
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
      thunkAPI.dispatch(GetEmployeeDetails());
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'Employee Added Successfully', alertType: 'success' }),
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

export const GetEmployeeDetails = createAsyncThunk(
  'Employee/GetEmployeeDetails',
  async (thunkAPI) => {
    try {
      const response = await EmployeeService.GetEmployeeDetails();
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

const initialState = { empData: [], loading: false };

const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  extraReducers: {
    [PostEmployeeManDetails.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostEmployeeManDetails.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetEmployeeDetails.fulfilled]: (state, action) => {
      state.empData = action.payload.resultSet;
      state.loading = false;
    },
    [GetEmployeeDetails.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = EmployeeSlice;
export default reducer;
