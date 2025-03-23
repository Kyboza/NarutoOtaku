import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../lib/axios";

// Define the character type
interface ICharacter {
    likes: number;
    userWhoLike: string[]
    error: null | string,
    loading: boolean
}

const initialState: ICharacter = {
    likes: 0,
    userWhoLike: [],
    error: null,
    loading: false
}

// Async thunk to fetch all characters from the database
export const fetchLikeInfo = createAsyncThunk("characters/fetchLikeInfo", async (characterName: string, {rejectWithValue}) => {
    try {
        const response = await axiosAPI.post("/api/characters/getLikes", {characterName});
        if (response.status === 200){
            console.log('Got Character likes and likers')
            return response.data;
        } else {
            throw new Error('Failed getting Character likes and likers')
        }
    } catch(error){
        if(error instanceof Error){
            return rejectWithValue(error.message);
          } else {
            console.log('Unknown error getting followers and following')
          }
    }
});

export const updateLikeInfo = createAsyncThunk('characters/updateLikeInfo', async(data: {visitingUser: string, characterName: string},{rejectWithValue}) => {
    try {
        const response = await axiosAPI.post("/api/characters/updateLikes", {data});
        if (response.status === 200){
            console.log('Got Character likes and likers')
            return response.data;
        } else {
            throw new Error('Failed getting Character likes and likers')
        }
    } catch(error){
        if(error instanceof Error){
            return rejectWithValue(error.message);
          } else {
            console.log('Unknown error getting followers and following')
          }
    }
})

// Create the slice to manage character data
const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        handleLike: (state, action: PayloadAction<string>) => {
            const visitingUser = action.payload;

            if (!Array.isArray(state.userWhoLike)) {
                state.userWhoLike = [];
              }
          
              // Ensure state.followers is a number
              if (typeof state.likes !== 'number') {
                state.likes = 0;
              }
            if(state.userWhoLike.includes(visitingUser)){
                state.userWhoLike = state.userWhoLike.filter((user) => user !== visitingUser)
                state.likes = state.likes -= 1
            } else {
                state.userWhoLike.push(visitingUser);
                state.likes = state.likes += 1
            }
        }
       
    },

    extraReducers: (builder) => {
        // Hantera fullföljd av 'fetchLikeInfo' action
        builder.addCase(fetchLikeInfo.fulfilled, (state, action) => {
            state.likes = action.payload.likes;
            state.userWhoLike = action.payload.userWhoLike;
            state.error = null;
            state.loading = false;
        })
        .addCase(fetchLikeInfo.pending, (state) => {
            state.error = null;
            state.loading = true;
        })
        .addCase(fetchLikeInfo.rejected, (state, action) => {
            state.error = action.error?.message || 'Unknown Error Fetching Likes and Likers';
            state.loading = false;
        });
    
        // Hantera fullföljd av 'updateLikeInfo' action
        builder.addCase(updateLikeInfo.fulfilled, (state, action) => {
            state.likes = action.payload.likes;
            state.userWhoLike = action.payload.userWhoLike;
            state.loading = false;
            state.error = null;
        })
        .addCase(updateLikeInfo.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateLikeInfo.rejected, (state, action) => {
            state.error = action.error?.message || 'Unknown error while updating likes for character';
            state.loading = false;
        });
    },
    
});

// Export actions for use in components
export const {handleLike} = characterSlice.actions;

// Export the reducer to be used in the store
export default characterSlice.reducer;
