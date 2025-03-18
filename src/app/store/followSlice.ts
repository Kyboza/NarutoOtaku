import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axiosAPI from "../lib/axios"

interface IFollow {
    following: string[]
    followers: number
}

const initialState: IFollow = {
    following: [],
    followers: 0
}

export const updateFollowAmount = createAsyncThunk('followSlice/updateFollowAmount', async(username: string) => {
    try {
        const response = await axiosAPI.post('/api/followers', {username});
        if(response.status === 200){
            return response.data.followers
        } else {
            throw new Error('failed to update followers in database')
        }
    } catch(error){
        handleErrorWithAxios(error)
    }
})

const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
      handleFollow: (state, action: PayloadAction<string>) => {
        const username = action.payload;
        const checkIncluded = state.following.includes(username);
        if (!checkIncluded) {
          state.following.push(username);  // Lägg till användare till listan
          state.followers += 1;            // Öka antal följare
        } else {
          state.following = state.following.filter(name => name !== username); // Ta bort från följande listan
          state.followers -= 1; // Minska antal följare
        }
      }
    }
  });

export const {handleFollow} = followSlice.actions
export default followSlice.reducer