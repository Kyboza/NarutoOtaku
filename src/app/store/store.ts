import { configureStore } from "@reduxjs/toolkit";
import likesReducer from './likesSlice'
import characterReducer from './characterSlice'


const store = configureStore({
    reducer: {
        likes: likesReducer,
        character: characterReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


