
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../api';

// Fetching the list of all restaurants
export const fetchRestaurants = createAsyncThunk('restaurant', async () => {
    const response = await API.get('/restaurant');
    return response.data;
});

// Fetching dishes for a specific restaurant
export const fetchRestaurantDishes = createAsyncThunk('restaurant/dishes', async (id) => {
    const response = await API.get(`/dish/${id}`);
    return response.data;
});

// Fetching all dishes
export const fetchAllDishes = createAsyncThunk('dishes', async () => {
    const response = await API.get('/dishes');
    return response.data;
});

// Fetching dishes filtered by category
export const fetchDishesByCategory = createAsyncThunk(
    'dishes/category',
    async (category) => {
        const response = await API.get(`/dishes/category/${category}`);
        return response.data;
    }
);

// Select dishes (this is already included in your example)
export const selectDishesData = createAsyncThunk('restaurant/dishesData', async () => {
    const response = await API.get('/dishes');
    return response.data;
});

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: {
        restaurant: [],
        restaurantDishes: [],
        dishes: [],
        selectedDishes: [],
        selectedCategory: null,  // Track the selected category
        error: null,
        restaurantStatus: 'idle',
        restaurantDishesStatus: 'idle',
        dishStatus: 'idle',
        selectedDishesStatus: 'idle',
        categoryDishesStatus: 'idle'  // Status for category-specific dishes
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // restaurants
            .addCase(fetchRestaurants.pending, (state) => {
                state.restaurantStatus = "loading";
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.restaurantStatus = "success";
                state.restaurant = action.payload;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.restaurantStatus = "error";
                state.error = action.error.message;
            })

            // selected restaurants
            .addCase(fetchRestaurantDishes.pending, (state) => {
                state.restaurantDishesStatus = "loading";
            })
            .addCase(fetchRestaurantDishes.fulfilled, (state, action) => {
                state.restaurantDishesStatus = "success";
                state.restaurantDishes = action.payload;
            })
            .addCase(fetchRestaurantDishes.rejected, (state, action) => {
                state.restaurantDishesStatus = "error";
                state.error = action.error.message;
            })

            // all dishes
            .addCase(fetchAllDishes.pending, (state) => {
                state.dishStatus = "loading";
            })
            .addCase(fetchAllDishes.fulfilled, (state, action) => {
                state.dishStatus = "success";
                state.dishes = action.payload;
            })
            .addCase(fetchAllDishes.rejected, (state, action) => {
                state.dishStatus = "error";
                state.error = action.error.message;
            })

            // dishes by category (for MiniDishList categories)
            .addCase(fetchDishesByCategory.pending, (state) => {
                state.categoryDishesStatus = 'loading';
            })
            .addCase(fetchDishesByCategory.fulfilled, (state, action) => {
                state.dishStatus = 'succeeded';
                state.dishes = action.payload; // Update dishes array with filtered results
            })
            .addCase(fetchDishesByCategory.rejected, (state, action) => {
                state.categoryDishesStatus = 'failed';
                state.error = action.error.message;
            })

            // selected dishes
            .addCase(selectDishesData.pending, (state) => {
                state.selectedDishesStatus = 'loading';
            })
            .addCase(selectDishesData.fulfilled, (state, action) => {
                state.selectedDishes = action.payload;
                state.selectedDishesStatus = 'succeeded';
            })
            .addCase(selectDishesData.rejected, (state) => {
                state.selectedDishesStatus = 'failed';
            });
    }
});

export const { setSelectedCategory, clearSelectedCategory } = restaurantSlice.actions;
export default restaurantSlice.reducer;