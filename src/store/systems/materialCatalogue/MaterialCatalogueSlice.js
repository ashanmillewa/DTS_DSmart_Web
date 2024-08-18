import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MaterialCatalogueService from 'src/store/service/MaterialCatalogueService';
import { setMessage } from '../../apps/message';
const initialState = {
  materials: [],
  materialDetails: [],
  categories: [],
  materialSave: '',
  materialSearch: '',
  error: '',
  uomOptions: [],
};

export const GetMaterials = createAsyncThunk(
  '/Admin/MaterialCatalogue/GetMaterialCatelogue',
  async (_, thunkAPI) => {
    try {
      const response = await MaterialCatalogueService.GetMaterials();
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetMaterialDetails = createAsyncThunk(
  '/Admin/MaterialCatalogue/GetMaterialDetails',
  async (materialCode, thunkAPI) => {
    try {
      const response = await MaterialCatalogueService.GetMaterialDetails(materialCode);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetCategories = createAsyncThunk(
  '/Admin/MaterialCatalogue/GetCategories',
  async (_, thunkAPI) => {
    try {
      const response = await MaterialCatalogueService.GetCategories();
      if (response.StatusCode !== 200) {
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const InsertMaterial = createAsyncThunk(
  '/Admin/MaterialCatalogue/InsertMaterial',
  async (payload, thunkAPI) => {
    try {
      const response = await MaterialCatalogueService.InsertMaterial(payload);
      if (response.statusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.statusCode + ' ' + response.result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetMaterialDetails());
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: 'Material Details Added Successfully',
          alertType: 'success',
        }),
      );
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const UpdateMaterialDetails = createAsyncThunk(
  '/Admin/MaterialCatalogue/UpdateMaterialDetails',
  async (materialData, thunkAPI) => {
    try {
      const response = await MaterialCatalogueService.UpdateMaterialDetails(materialData);
      if (response.statusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.statusCode + ' ' + response.result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetMaterialDetails());
      thunkAPI.dispatch(
        setMessage({
          isShow: true,
          text: 'Material Details Updated Successfully',
          alertType: 'success',
        }),
      );
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetUOMOptions = createAsyncThunk(
  'Admin/MaterialCatalogue/GetLoadUnitsDetails',
  async (_, thunkAPI) => {
    try {
      const response = await MaterialCatalogueService.GetUOMOptions();
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

const materialCatalogueSlice = createSlice({
  name: 'materialCatalogue',
  initialState,
  reducers: {
    searchMaterial(state, action) {
      state.materialSearch = action.payload;
    },
    saveMaterial(state, action) {
      state.materialSave = action.payload;
    },
  },
  extraReducers: {
    [GetMaterials.fulfilled]: (state, action) => {
      state.materials = action.payload;
    },
    [GetMaterials.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [GetMaterialDetails.fulfilled]: (state, action) => {
      state.materialDetails = action.payload;
    },
    [GetMaterialDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [GetCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [GetCategories.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [InsertMaterial.fulfilled]: (state, action) => {
      state.materialSave = action.payload;
    },
    [InsertMaterial.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [UpdateMaterialDetails.fulfilled]: (state, action) => {
      state.materialSave = action.payload;
    },
    [UpdateMaterialDetails.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [GetUOMOptions.fulfilled]: (state, action) => {
      state.uomOptions = action.payload;
    },
    [GetUOMOptions.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { searchMaterial, saveMaterial } = materialCatalogueSlice.actions;

export default materialCatalogueSlice.reducer;
