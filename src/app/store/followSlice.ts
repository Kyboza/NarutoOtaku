import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosAPI from '../lib/axios'
import { toast } from 'sonner'

type IFollow = {
  following: string[]
  followers: number
  loading: boolean
  error: null | string
}

const initialState: IFollow = {
  following: [],
  followers: 0,
  loading: false,
  error: null,
}

export const updateFollowAmount = createAsyncThunk(
  'followSlice/updateFollowAmount',
  async (
    { userProp, visitingProp }: { userProp: string; visitingProp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosAPI.post('/api/followers', {
        username: userProp,
        visitingUsername: visitingProp,
      })
      if (response.status === 200) {
        return response.data
      }
      throw new Error('Failed to update followers in database')
    } catch (error) {
      handleErrorWithAxios(error)
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }
)

export const loadFollowAmount = createAsyncThunk(
  'followSlice/loadFollowAmount',
  async (userProp: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post('/api/getFollowers', { userProp })

      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Failed to get followers and following')
      }
    } catch (error) {
      handleErrorWithAxios(error)
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }
)

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    handleFollow: (state, action: PayloadAction<string>) => {
      const username = action.payload

      if (!Array.isArray(state.following)) {
        state.following = []
      }

      if (typeof state.followers !== 'number') {
        state.followers = 0
      }

      if (state.following.includes(username)) {
        state.following = state.following.filter((name) => name !== username)
        state.followers = state.followers -= 1
        toast.success('Successfully Unfollowed User', {
          id: 'follow-user',
        })
      } else {
        state.following.push(username)
        state.followers = state.followers += 1
        toast.success('Successfully Followed User', {
          id: 'follow-user',
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFollowAmount.fulfilled, (state, action) => {
        state.followers = action.payload.followers
        state.following = action.payload.following
        state.loading = false
        state.error = null
      })
      .addCase(updateFollowAmount.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown Error'
      })

    builder
      .addCase(loadFollowAmount.fulfilled, (state, action) => {
        const { followers, following } = action.payload.data

        state.followers = followers
        state.following = following
        state.loading = false
        state.error = null
      })
      .addCase(loadFollowAmount.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch followers'
      })
      .addCase(loadFollowAmount.pending, (state) => {
        state.loading = true
        state.error = null
      })
  },
})

export const { handleFollow } = followSlice.actions
export default followSlice.reducer
