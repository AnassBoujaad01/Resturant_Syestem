import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryList: [],
    categorySelectId: null,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            const Category = action.payload;
            // Create a new array with the updated category appended
            state.categoryList = [Category];
        },
        // You don't need to dispatch an action here, just update the state
        setCategoryID: (state, action) => {
            state.categorySelectId = action.payload;
            
        }
    },
});
