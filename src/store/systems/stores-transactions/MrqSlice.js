// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import MrqService from 'src/store/service/MrqService';

// const initialState = {
//   mrqMaterials: [],
//   mrqSearch: '',
//   mrqSave: '',
//   error: '',
// };

// // Async thunk for loading MRQ materials
// export const loadMrqMaterials = createAsyncThunk(
//   'Admin/StoresTransactions/LoadMRQMaterialDetails',
//   async (whCode, thunkAPI) => {
//     try {
//       const response = await MrqService.loadMRQMaterialDetails(whCode);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message || error.toString());
//     }
//   }
// );

// // Async thunk for saving MRQ details
// export const saveMrqDetails = createAsyncThunk(
//   'Admin/StoresTransactions/PostMRQDetails',
//   async ({ whCode, materials }, thunkAPI) => {
//     try {
//       const response = await MrqService.saveMRQDetails(whCode, materials);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message || error.toString());
//     }
//   }
// );

// const MrqSlice = createSlice({
//   name: 'mrq',
//   initialState,
//   reducers: {
//     searchMrq(state, action) {
//       state.mrqSearch = action.payload;
//     },
//     saveMrq(state, action) {
//       state.mrqSave = action.payload;
//     },
//   },
//   extraReducers: {
//     [loadMrqMaterials.fulfilled]: (state, action) => {
//       state.mrqMaterials = action.payload;
//     },
//     [loadMrqMaterials.rejected]: (state, action) => {
//       state.error = action.payload;
//     },
//     [saveMrqDetails.fulfilled]: (state, action) => {
//       state.mrqSave = action.payload;
//     },
//     [saveMrqDetails.rejected]: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { searchMrq, saveMrq } = MrqSlice.actions;

// export default MrqSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MrqService from 'src/store/service/MrqService';

const initialState = {
  mrqMaterials: [],
  mrqSearch: '',
  mrqSave: '',
  error: '',
};

// Async thunk for loading MRQ materials
export const loadMrqMaterials = createAsyncThunk(
  'mrq/loadMrqMaterials',
  async (whCode, thunkAPI) => {
    try {
      const response = await MrqService.loadMRQMaterialDetails(whCode);
      return response.data; // Assuming response contains a data field
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);

// Async thunk for saving MRQ details
export const saveMrqDetails = createAsyncThunk(
  'mrq/saveMrqDetails',
  async ({ whCode, materials }, thunkAPI) => {
    try {
      const response = await MrqService.saveMRQDetails(whCode, materials);
      return response.data; // Assuming response contains a data field
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || error.toString());
    }
  }
);

const mrqSlice = createSlice({
  name: 'mrq',
  initialState,
  reducers: {
    searchMrq(state, action) {
      state.mrqSearch = action.payload;
    },
    saveMrq(state, action) {
      state.mrqSave = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMrqMaterials.fulfilled, (state, action) => {
        state.mrqMaterials = action.payload;
      })
      .addCase(loadMrqMaterials.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(saveMrqDetails.fulfilled, (state, action) => {
        state.mrqSave = action.payload;
      })
      .addCase(saveMrqDetails.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { searchMrq, saveMrq } = mrqSlice.actions;

export default mrqSlice.reducer;
