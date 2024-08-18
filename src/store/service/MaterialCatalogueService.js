
import axios from 'axios';

const GetMaterials = async () => {
  try {
    const response = await axios.get(`/Admin/MaterialCatalogue/GetMaterialCatelogue`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};


const GetMaterialDetails = async (materialCode) => {
  try {
    const response = await axios.get(`/Admin/MaterialCatalogue/GetMaterialDetails`, {
      params: { Mcode: materialCode }
    });
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};


const GetCategories = async () => {
  try {
    const response = await axios.get(`/Admin/MaterialCatalogue/GetCategories`);
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};

const InsertMaterial = async (payload) => {
  try {
    const response = await axios.post(`/Admin/MaterialCatalogue/PostMaterialCatalogue?p_mmc_child_key=${payload.CatCode}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const UpdateMaterialDetails = async (materialData) => {
  try {
    const response = await axios.post(`/Admin/MaterialCatalogue/PostMaterialCatalogue?MatCode=${materialData.MatCode}`, materialData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetUOMOptions = async () => {
  try {
    const response = await axios.get('/Admin/MaterialCatalogue/GetLoadUnitsDetails');
    return response.data.resultSet;
  } catch (error) {
    throw error;
  }
};


const MaterialCatalogueService = {
  GetMaterials,
  GetMaterialDetails,
  GetCategories,
  InsertMaterial,
  UpdateMaterialDetails,
  GetUOMOptions,
};

export default MaterialCatalogueService;
