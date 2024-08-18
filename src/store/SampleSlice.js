import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ActivityService from '../../services/admin/activityService';
import { setMessage } from '../message';

export const PostNewActivity = createAsyncThunk(
  'Admin/HelpDesk/PostNewActivity',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ActivityService.PostNewActivity(formData);
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskActivities());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Activity Added Successfully', alertType: 'success' }));
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

export const GetHelpDeskActivities = createAsyncThunk(
  'Admin/HelpDesk/GetHelpDeskActivities',
  async (thunkAPI) => {
    try {
      const response = await ActivityService.GetHelpDeskActivities();
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
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

export const UpdateActivity = createAsyncThunk(
  'Admin/HelpDesk/UpdateActivity',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ActivityService.UpdateActivity(formData);
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskActivities());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Activity Updated Successfully', alertType: 'success' }));
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

export const DeleteActivity = createAsyncThunk(
  'Admin/HelpDesk/DeleteActivity',
  async ({ id }, thunkAPI) => {
    try {
      const response = await ActivityService.DeleteActivity(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetHelpDeskActivities());
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Activity Deleted Successfully', alertType: 'success' }));
        return response;
      } else {
        // thunkAPI.dispatch(setMessage('Invalid Credentials!'));
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

const initialState = { data: [], loading: false };

const companySlices = createSlice({
  name: 'activity',
  initialState,
  extraReducers: {
    [PostNewActivity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewActivity.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskActivities.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskActivities.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateActivity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateActivity.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteActivity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteActivity.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = companySlices;
export default reducer;
