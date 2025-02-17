import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    likes: 0
}

const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        increment: (state) => {
            state.likes += 1
        },
        decrement: (state) => {
            state.likes -=1
        }
    }
});

export const {increment, decrement} = likesSlice.actions;

const store = configureStore({
    reducer: {
        likes: likesSlice.reducer
    }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch