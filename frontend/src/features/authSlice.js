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
    token: null, // Token JWT
    user: null, // Data user (misalnya nama, email, role)
    isLoading: false, // Status loading
    error: null, // Error message (jika ada)
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Hapus token dari localStorage saat logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Check Login
      .addCase(checkLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.token = null;
        state.user = null;
        localStorage.removeItem('token'); // Hapus token jika verifikasi gagal
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
