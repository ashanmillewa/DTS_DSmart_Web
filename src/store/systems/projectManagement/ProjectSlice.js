import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import ProjectService from 'src/store/service/ProjectService';
// const API_URL = '/api/data/employee/EmployeeData';

const initialState = {
  projects: [],
  projectSearch: '',
  projectSave: '',
  projectExport: '',
  error: '',
};

export const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getProjects: (state, action) => {
      state.projects = action.payload;
    },
    SearchProjects: (state, action) => {
      state.projectSearch = action.payload;
    },
    saveProjects: (state, action) => {
      state.projectSave = action.payload;
    },
    exportProjects: (state, action) => {
      state.projectExport = action.payload;
    },
  },
});
export const { hasError, getProjects, SearchProjects } = ProjectSlice.actions;

export const fetchProjects = () => async (dispatch) => {
  try {
    const response = await ProjectService.GetProjectDetails();
    dispatch(getProjects(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};

export default ProjectSlice.reducer;
