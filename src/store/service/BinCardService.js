import axios from 'axios';

const GetBinCardDetails = async () => {
  try {
    const response = await axios.get(`/Admin/BinCardDetails/GetBinMatDetails`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};
const GetBinCardByMaterialCode = async (materialCode) => {
  try {
    const response = await axios.get(`/Admin/BinCardDetails/GetBinCardByMaterialCode`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const BinCardService = {
  GetBinCardDetails,
  GetBinCardByMaterialCode,
};

export default BinCardService;
