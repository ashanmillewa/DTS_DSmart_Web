import axios from "axios";

const UpdateWarehouseEntry = async (entryData) => {
  try {
    const response = await axios.post(`/Admin/MaterialCatalogue/PostMaterialDetails`, entryData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const insertWarehouseEntry = async (entryData) => {
  const response = await axios.post(`/Admin/MaterialCatalogue/PostMaterialDetails`, entryData);
  return response.data;
};

const GetLoadUnitsWHDetails = async () => {
  try {
    const response = await axios.get('/Admin/MaterialCatalogue/GetLoadUnitsWHDetails');
    return response.data;
  } catch (error) {
    throw error;
  }
};
const MaterialDetailsService = {

  UpdateWarehouseEntry,
  insertWarehouseEntry,
  GetLoadUnitsWHDetails,

};

export default MaterialDetailsService;

