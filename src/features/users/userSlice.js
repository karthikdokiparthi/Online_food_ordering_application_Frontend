import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api";

// Register user
export const userRegistration = createAsyncThunk('user/register', async (user) => {
    const response = await API.post('/register', user);
    return response.data;
});

// Login user
export const userLogin = createAsyncThunk('user/login', async (user) => {
    const response = await API.post('/login', user);
    return response.data;
});

const initialToken = localStorage.getItem('token');

const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: {},
        token: initialToken || null,
        isAuthenticated: !!initialToken,
        error: null,
        registerStatus: 'idle',
        loginStatus: 'idle',
    },
    reducers: {
        logout(state) {
            state.user = {};
            state.token = null;
            state.isAuthenticated = false;
            state.loginStatus = 'idle';
            state.error = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            // Registration
            .addCase(userRegistration.pending, (state) => {
                state.registerStatus = "loading";
            })
            .addCase(userRegistration.fulfilled, (state, action) => {
                state.registerStatus = "success";
                state.user = action.payload;
            })
            .addCase(userRegistration.rejected, (state, action) => {
                state.registerStatus = "error";
                state.error = action.error.message;
            })

            // Login
            .addCase(userLogin.pending, (state) => {
                state.loginStatus = "loading";
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loginStatus = "success";
                state.user = action.payload.user;  // Assuming backend returns user data
                state.token = action.payload.token;  // Direct access to token
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loginStatus = "error";
                state.error = action.error.message;
                state.isAuthenticated = false;
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
