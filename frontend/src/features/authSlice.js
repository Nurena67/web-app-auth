import axiosInstance from '../features/axiosInstance.js'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const login = createAsyncThunk('auth/login', async ({email, password}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance('https://web-app-auth.up.railway.app/login', 
    {
      email,
      password
    }, 
    { withCredentials: true });
    
    const token = response.data.token;
    localStorage.setItem('token',token);

    return { user : response.data.user, token}; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const checkLogin = createAsyncThunk('auth/checkLogin', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance('https://web-app-auth.up.railway.app/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      }, withCredentials: true
    });
    return { user : response.data }; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Not authenticated");
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const token = localStorage.getItem("token");

    await axiosInstance("https://web-app-auth.up.railway.app/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      }, withCredentials: true
    });

    // Menghapus token dari localStorage
    localStorage.removeItem("token");

    return {};
  } catch (error) {
    console.error("Logout failed:", error);
  }
});

export const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      token: null,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: "",
    },
    reducers:{
        reset: (state) => {
          state.isError = false;
          state.isSuccess = false;
          state.isLoading = false;
          state.message = "";
        },
    },
    extraReducers:(builder) =>{
        builder.addCase(login.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(login.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        // Get User Login
        builder.addCase(checkLogin.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(checkLogin.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
        });
        builder.addCase(checkLogin.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        builder.addCase(logout.fulfilled, (state) => {
          state.user = null;
          state.token = null;
          state.isSuccess = false;
        });
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
