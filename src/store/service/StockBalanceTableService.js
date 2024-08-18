import axios from 'axios';

const API_URL = 'https://esystems.cdl.lk/backend-Test/DSMartWeb/Admin/StockBlanceDetails/GetStockBalanceDetails';

const fetchStockBalanceDetails = async (startDate, endDate) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        startDate,
        endDate
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock balance details:', error);
    throw error;
  }
};

export default {
  fetchStockBalanceDetails
};
