import { configureStore } from "@reduxjs/toolkit";
import likesReducer from './likesSlice'
import characterReducer from './characterSlice'
import statusReducer from './statusSlice'


const store = configureStore({
    reducer: {
        likes: likesReducer,
        character: characterReducer,
        status: statusReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


