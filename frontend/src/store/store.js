import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/auth"
const store = configureStore(
    {
        reducer: {
            auth: authSlice
        }
    }
);

export default store;