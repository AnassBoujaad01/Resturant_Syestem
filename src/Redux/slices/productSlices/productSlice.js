import { createSlice } from "@reduxjs/toolkit";
import Data from '../../../DataLocal/data.json'
const initialState={
    productList:[]
}

export const ProductSlice=createSlice({
    name:'Product',
    initialState,
    reducers:{
        setProducts: (state,action) => {
            const categoryID=action.payload;
            const products =Data.MenuItems.filter(product => product.CategoryID===categoryID)
            state.productList=[products];
            console.log("Display from slice Product :"+products)
        }
    }
})