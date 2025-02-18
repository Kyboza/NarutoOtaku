import { configureStore } from "@reduxjs/toolkit";
import likesReducer from './likesSlice'


const store = configureStore({
    reducer: {
        likes: likesReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


