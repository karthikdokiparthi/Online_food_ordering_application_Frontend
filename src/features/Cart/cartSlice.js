import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const item = state.find((dish) => dish.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        increaseQty: (state, action) => {
            const item = state.find((dish) => dish.name === action.payload.name);
            if (item) item.quantity += 1;
        },
        decreaseQty: (state, action) => {
            const index = state.findIndex(i => i.name === action.payload.name);
            if (index !== -1) {
                if (state[index].quantity > 1) {
                    state[index].quantity -= 1;
                } else {
                    state.splice(index, 1); // remove item (mutating the draft)
                }
            }
        },
        deleteFromCart: (state, action) => {
            return state.filter(dish => dish.name !== action.payload.name);
        }
    }
});
export const { addToCart, increaseQty, decreaseQty, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;