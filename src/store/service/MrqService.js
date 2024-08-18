// import axios from 'axios';

// const loadMRQMaterialDetails = async (whCode) => {
//   const config = {
//     method: 'get',
//     url: `/Admin/StoresTransactions/LoadMRQMaterialDetails`,
//   };
//   return await axios.request(config).then((response) => {
//     return response;
//   });
// };

// const saveMRQDetails = async (whCode, mrqData) => {
//   const config = {
//     method: 'post',
//     url: `https://esystems.cdl.lk/backend-Test/DSMartWeb/Admin/StoresTransactions/PostMRQDetails?WHcode=${whCode}`,
//     data: mrqData,
//   };
//   return await axios.request(config).then((response) => {
//     return response;
//   });
// };

// export default {
//   loadMRQMaterialDetails,
//   saveMRQDetails,
// };
import axios from 'axios';

// Define the base URL for API requests
const BASE_URL = 'https://esystems.cdl.lk/backend-Test/DSMartWeb/Admin/StoresTransactions';

// Function to load MRQ material details
const loadMRQMaterialDetails = async (whCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/LoadMRQMaterialDetails?WHcode=${whCode}`);
    return response.data;
  } catch (error) {
    console.error('Failed to load MRQ material details', error);
    throw error;
  }
};

// Function to save MRQ details
const saveMRQDetails = async (whCode, materials) => {
  try {
    const response = await axios.post(`${BASE_URL}/PostMRQDetails?WHcode=${whCode}`, { materials });
    return response.data;
  } catch (error) {
    console.error('Failed to save MRQ details', error);
    throw error;
  }
};

export default {
  loadMRQMaterialDetails,
  saveMRQDetails,
};
