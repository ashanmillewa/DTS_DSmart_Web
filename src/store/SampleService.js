import axios from 'axios';

const PostNewActivity = (data) => {
  return axios.post('Admin/HelpDesk/PostNewActivity', data).then((response) => {
    return response.data;
  });
};

const GetHelpDeskActivities = (data) => {
  return axios.get(`Admin/HelpDesk/GetHelpDeskActivities`, data).then((response) => {
    return response.data;
  });
};
const UpdateActivity = (data) => {
  return axios.post(`Admin/HelpDesk/UpdateActivity`, data).then((response) => {
    return response.data;
  });
};
const DeleteActivity = (data) => {
  return axios.post(`Admin/HelpDesk/DeleteActivity?id=${data}`).then((response) => {
    return response.data;
  });
};

const activityService = {
  PostNewActivity,
  GetHelpDeskActivities,
  UpdateActivity,
  DeleteActivity,
};

export default activityService;
