import axios from 'axios';

const GetProjects = async () => {
  try {
    const response = await axios.get(`/Admin/ProjectDetails/GetProjectDetails`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const GetProjectDetails = async (projectid) => {
  try {
    const response = await axios.get(`/Admin/ProjectDetails/GetProjectDetails`, {
      params: { Mcode: projectid },
    });
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const GetProjectCategories = async () => {
  try {
    const response = await axios.get(`/Admin/ProjectDetails/GetProjectCategories`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const InsertProject = async (payload) => {
  try {
    const response = await axios.post(`/Admin/ProjectDetails/postProjectDetails`,payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const UpdateProjectDetails = async (payload) => {
  try {
    const response = await axios.post(`/Admin/ProjectDetails/postProjectDetails`,payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ProjectManagerService = {
  GetProjects,
  GetProjectDetails,
  GetProjectCategories,
  InsertProject,
  UpdateProjectDetails,
};

export default ProjectManagerService;
