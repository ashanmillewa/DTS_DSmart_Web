import axios from 'axios';

export const GetWarehouseDetails = async () => {
  const config = {
    method: 'get',
    url: 'https://esystems.cdl.lk/backend-Test/DSMartWeb/Admin/Warehouse/GetWarehouseInfo',
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error('Error fetching warehouse details:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request made but no response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export default {
  GetWarehouseDetails,
};
