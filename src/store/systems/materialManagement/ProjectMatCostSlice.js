import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../apps/message';
import ProjectMatCostService from 'src/store/service/ProjectMatCostService';



export const GetProjectMatCostService = createAsyncThunk(
  'Employee/GetEmployeeDetails',
  async ({ startDate, endDate },thunkAPI) => {
    try {
      const response = await ProjectMatCostService.GetProjectMatCostService(startDate, endDate);
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

// const initialState = { empData: [], loading: false };
const initialState = {
  projectmatcosts: [],
  projectmatcostSearch: '',
  projectmatcostSave: '',
  error: '',
  loading: false
};


const ProjectMatCostSlice = createSlice({
  name: 'projectMatCost',
  initialState,
  extraReducers: {
    [GetProjectMatCostService.fulfilled]: (state, action) => {
      state.projectmatcosts = action.payload.resultSet;
      state.loading = false;
    },
    [GetProjectMatCostService.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = ProjectMatCostSlice;
export default reducer;
