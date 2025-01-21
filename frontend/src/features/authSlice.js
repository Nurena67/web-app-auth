import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk untuk login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://web-app-auth.up.railway.app/login', credentials);

    // Ambil token dari respons
    const { token, user } = response.data;

    // Simpan token ke localStorage
    localStorage.setItem('token', token);

    return { token, user };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Thunk untuk memeriksa login berdasarkan token di localStorage
export const checkLogin = createAsyncThunk('auth/checkLogin', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token tidak ditemukan');

    // Pengecekan login hanya dilakukan jika token ada
    const response = await axios.get('https://web-app-auth.up.railway.app/users', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { token, user: response.data.user };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Slice untuk manajemen state autentikasi
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    isError: false,
    isSuccess: false,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
        state.message = 'Login successful';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Check Login
      .addCase(checkLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.message = 'User authenticated';
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;
