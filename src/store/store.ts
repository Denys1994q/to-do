import { configureStore } from "@reduxjs/toolkit";
import ToDoSlice from './slices/to-do'

const store = configureStore({
    reducer: {
        ToDoSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
})

export default store;