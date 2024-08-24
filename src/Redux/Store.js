import { configureStore } from "@reduxjs/toolkit";
import moviesApiSlice from "./ApiSlices/moviesApiSlice";
import tvApiSlice from "./ApiSlices/tvsApiSlice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        moviesApi: moviesApiSlice,
        tvsApi: tvApiSlice,

    }
})