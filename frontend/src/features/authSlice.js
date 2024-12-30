// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Async Thunks
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://web-app-auth.up.railway.app/login', credentials, { withCredentials: true });
    return response.data; // Misalnya { user: { id, name, email } }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const checkLogin = createAsyncThunk('auth/checkLogin', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://web-app-auth.up.railway.app/me', { withCredentials: true });
    return response.data; // Misalnya { user: { id, name, email } }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.delete('https://web-app-auth.up.railway.app/logout', {}, { withCredentials: true });
    return null; // Logout berhasil
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(login.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get User Login
        builder.addCase(checkLogin.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(checkLogin.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(checkLogin.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
