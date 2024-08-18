import axios from 'axios';


const GetReorderLevelDetails = async () => {
  try {
    const response = await axios.get(`/Admin/ReportingDetails/LoadReorderLRDetails`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const ReorderLevelService = {
  GetReorderLevelDetails,
};

export default ReorderLevelService;
