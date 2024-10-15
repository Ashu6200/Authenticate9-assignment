import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import { movieApi } from "./movieApi";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [movieApi.reducerPath]: movieApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
});