import axios from 'axios';
const GetSupplierDetails = (data) => {
  return axios.get(`Admin/SupplierManagement/GetSupplierDetails`, data).then((response) => {
    return response.data;
  });
};
const GetSupplierDetailsById = (id) => {
  return axios.get(`Admin/SupplierManagement/GetSupplierDetailsById?SupCode=${id}`, ).then((response) => {
    return response.data;
  });
};
const PostSupplierDetails = (data) => {
  return axios.post('Admin/SupplierManagement/PostSupplierDetails', data).then((response) => {
    return response.data;
  });
};

const SupplierService = {
  GetSupplierDetails,
  GetSupplierDetailsById,
  PostSupplierDetails,
};

export default SupplierService;
