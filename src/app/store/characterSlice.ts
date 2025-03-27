import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../lib/axios";
import { toast } from "sonner";

// Define the character type
type ICharacter = {
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
        handleErrorWithAxios(error);
        return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
});

export const updateLikeInfo = createAsyncThunk('characters/updateLikeInfo', async(data: {visitingUser: string, characterName: string},{rejectWithValue}) => {
    try {
        const response = await axiosAPI.post("/api/characters/updateLikes", {data});
        if (response.status === 200){
            return response.data;
        } else {
            throw new Error('Failed getting Character likes and likers')
        }
    } catch(error){
        handleErrorWithAxios(error);
        return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
})

const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        handleLike: (state, action: PayloadAction<string>) => {
            const visitingUser = action.payload;

            if (!Array.isArray(state.userWhoLike)) {
                state.userWhoLike = [];
              }
          
              if (typeof state.likes !== 'number') {
                state.likes = 0;
              }
            if(state.userWhoLike.includes(visitingUser)){
                state.userWhoLike = state.userWhoLike.filter((user) => user !== visitingUser)
                state.likes = state.likes -= 1
                toast.success('Unliked Character', {
                    id: 'character-like'
                })
            } else {
                state.userWhoLike.push(visitingUser);
                state.likes = state.likes += 1
                toast.success('Liked Character', {
                    id: 'character-like'
                })
            }
        }
       
    },

    extraReducers: (builder) => {
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


export const {handleLike} = characterSlice.actions;

export default characterSlice.reducer;
