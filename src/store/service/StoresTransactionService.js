import axios from 'axios';

const GetStoresTransactions = async (startDate, endDate) => {
  try {
    const response = await axios.get(`/Admin/StTransactions/LoadStoresTransactionData?StartDate=${startDate}&EndDate=${endDate}`, {
    });
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const GetStoresTransactionDetails = async (startDate, endDate) => {
  try {
    const response = await axios.get(`/Admin/StTransactions/LoadStoresTransactionData?StartDate=${startDate}&EndDate=${endDate}`, {
      params: { Mcode: startDate, endDate }
    });
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const StoresTransactionService = {
  GetStoresTransactions,
  GetStoresTransactionDetails,
};

export default StoresTransactionService;
