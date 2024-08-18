import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const setMessage = createAsyncThunk('setMessage', async (data, thunkAPI) => {
  return data;
});

export const clearMessage = createAsyncThunk('clearMessage', async (data, thunkAPI) => {
  return {};
});

const initialState = { message: { isShow: false, text: '', alertType: '' }, loading: false };

const messageSlice = createSlice({
  name: 'message',
  initialState,
  extraReducers: {
    [setMessage.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
    },
    [clearMessage.fulfilled]: (state, action) => {
      state.message = {isShow: false, text: '', alertType: ''};
    },
  },
});

const { reducer } = messageSlice;
export default reducer;
