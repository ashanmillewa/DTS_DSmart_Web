import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../service/AuthService';
import axios from 'axios';

//For Login -----------------------------------------------------
export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const response = await AuthService.login(username, password);

    if (response.StatusCode === 200 && response.AuthKey) {
      localStorage.setItem('DSM_Token', JSON.stringify(response.AuthKey));
      axios.defaults.headers.common['auth-key'] = response.AuthKey;
      return response;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
});

// For Logout ------------------------------------------------------
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await AuthService.logout();
    localStorage.clear();
    return { message: 'Logout successful' };
  } catch (error) {
    throw error;
  }
});

// For store loginstate when page is refresh
export const setLoginStatus = createAsyncThunk(
  'auth/setLoginStatus',
  ({ isLoggedIn }, thunkAPI) => {
    return { isLoggedIn };
  },
);

export const validateToken = createAsyncThunk('auth/validateToken', async (thunkAPI) => {
  try {
    const data = await AuthService.validateToken();
    if (data.statusCode === 200) {
      return data;
    } else {
      // thunkAPI.dispatch(setMessage({ isShow: true, text: 'Invalid Credentials!', alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
     localStorage.clear();
    console.log(message);
    // thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
    return thunkAPI.rejectWithValue();
  }
});

// const initialState = { isLoggedIn: false, user: null };
const initialState = {
  isLoggedIn: false,
  loading: false,
  headers: [],
  subHeaders: [],
  user: {},
  validating: false,
  gettingUserData: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {},
    [setLoginStatus.fulfilled]: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    [setLoginStatus.rejected]: (state, action) => {},
    [validateToken.pending]: (state, action) => {
      state.validating = true;
      state.isLoggedIn = false;
    },
    [validateToken.fulfilled]: (state, action) => {
      state.validating = false;
      state.isLoggedIn = true;
    },
    [validateToken.rejected]: (state, action) => {
      state.validating = false;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
