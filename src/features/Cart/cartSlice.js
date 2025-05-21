import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api";

export const fetchCart = createAsyncThunk('getcart', async () => {
    const response = await API.get('/cart');
    return response.data;
})

export const addToCart = createAsyncThunk('cart/addItem', async ({ dishId, quantity }) => {
    const response = await API.post(`/cart/add?dishId=${dishId}&quantity=${quantity}`);
    return response.data;
});

export const updateCart = createAsyncThunk('update', async ({ cartItemId, quantity }) => {
    const response = await API.put(`/cart/update/${cartItemId}?quantity=${quantity}`);
    return response.data;
});

export const removeCartItem = createAsyncThunk('remove', async (cartItemId) => {
    const response = await API.delete(`/cart/remove/${cartItemId}`);
    return response.data;
})

export const clearCart = createAsyncThunk('clear', async () => {
    const response = await API.post('/cart/clear');
    return response.data;
})
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })

            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })

            .addCase(updateCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })

            .addCase(removeCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })

            .addCase(clearCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })
    }

});
export default cartSlice.reducer;