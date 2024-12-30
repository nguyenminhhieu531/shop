import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import productSlice from "./features/productSlice";
import authenSlice from "./features/authenSlice";
import cartSlice  from "./features/cartSlice";


const reducer = combineReducers({
    categorySlice,
    productSlice,
    authenSlice,
    cartSlice
})

const store = configureStore({
    reducer
})

export default store;