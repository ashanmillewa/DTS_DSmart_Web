import { createSlice } from '@reduxjs/toolkit';
import WarehouseManagementDetailsService from 'src/store/service/WarehouseManagementDetailsService';

const initialState = {
  warehouses: [],
  warehouseSave: '',
  error: '',
};

export const WarehouseManagementDetailsSlice = createSlice({
  name: 'warehouseManagementDetails',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getWarehouses: (state, action) => {
      state.warehouses = action.payload;
    },
    saveWarehouse: (state, action) => {
      state.warehouseSave = action.payload;
    },
  },
});

export const { hasError, getWarehouses, saveWarehouse } = WarehouseManagementDetailsSlice.actions;

export const fetchWarehouses = () => async (dispatch) => {
  try {
    const response = await WarehouseManagementDetailsService.GetWarehouseDetails();
    dispatch(getWarehouses(response.data.resultSet));
  } catch (error) {
    dispatch(hasError(error.message || error.toString()));
    return Promise.reject(error);
  }
};

export default WarehouseManagementDetailsSlice.reducer;
