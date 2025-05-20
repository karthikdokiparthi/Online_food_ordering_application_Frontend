import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/users/userSlice';
import restaurantReducer from './features/restaurant/restaurantSlice';
import cartReducer from './features/Cart/cartSlice';

const store = configureStore({
    reducer: {
        users: userReducer,
        restaurant: restaurantReducer,
        cart: cartReducer
    }
})
export default store;