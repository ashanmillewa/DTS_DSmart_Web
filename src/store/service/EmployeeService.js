import axios from 'axios';

const GetEmployeeDetails = (data) => {
  return axios.get(`Admin/EmployeeManagement/GetEmployeeManDetails`, data).then((response) => {
    return response.data;
  });
};
const PostEmployeeManDetails = (data) => {
  return axios.post('Admin/EmployeeManagement/PostEmployeeManDetails', data).then((response) => {
    return response.data;
  });
};

const EmployeeService = {
  GetEmployeeDetails,
  PostEmployeeManDetails,
};

export default EmployeeService;
