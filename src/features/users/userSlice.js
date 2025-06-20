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

//post user address
export const userAddress = createAsyncThunk('user/address', async (user) => {
    const response = await API.post('/address', user);
    return response.data;
})

//get user info
export const userDetails = createAsyncThunk('user/details', async () => {
    const response = await API.get('/username');
    return response.data;
})

//get user address
export const userAddressDetails = createAsyncThunk('user/addressData', async (user) => {
    const response = await API.get('/address');
    return response.data;
})


const initialToken = localStorage.getItem('token');

const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: {},
        address: {},
        addressData: {},
        token: initialToken || null,
        isAuthenticated: !!initialToken,
        error: null,
        registerStatus: 'idle',
        loginStatus: 'idle',
        userDetailsStatus: 'idel',
        addresStatus: 'idel',
        addresDetailsStatus: 'idel'
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
            })

            //Update user address
            .addCase(userAddress.pending, (state) => {
                state.addresStatus = "loading";
            })
            .addCase(userAddress.fulfilled, (state, action) => {
                state.addresStatus = "success";
                state.addressData = action.payload;
            })
            .addCase(userAddress.rejected, (state, action) => {
                state.addresStatus = "error";
                state.error = action.message.error;
            })

            //Get user Details
            .addCase(userDetails.pending, (state) => {
                state.userDetailsStatus = "loading";
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.userDetailsStatus = "success";
                state.user = action.payload;
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.userDetailsStatus = "error";
                state.error = action.error.message;
            })

            //Get user address details
            .addCase(userAddressDetails.pending, (state) => {
                state.addresDetailsStatus = "loading";
            })
            .addCase(userAddressDetails.fulfilled, (state, action) => {
                state.addresDetailsStatus = "success";
                state.address = action.payload;
            })
            .addCase(userAddressDetails.rejected, (state, action) => {
                state.addresDetailsStatus = "error";
                state.error = action.error.message;
            });

    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
