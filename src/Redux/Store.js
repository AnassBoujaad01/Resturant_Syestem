import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './slices/categorySlices/categorySlice';
import { orderSlice } from './slices/orderSlices/orderSlice';
import { ProductSlice } from './slices/productSlices/productSlice';

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    order:orderSlice.reducer,
    Product:ProductSlice.reducer,
    
  }
});
