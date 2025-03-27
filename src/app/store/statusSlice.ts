import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosAPI from '../lib/axios'

type activeState = {
  active: boolean
  loading: boolean
  error: null | string
  userName: string
}

const initialState: activeState = {
  active: false,
  loading: false,
  error: null,
  userName: '',
}

export const fetchUserStatus = createAsyncThunk(
  'status/fetchUserStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get('/api/status')
      if (response.status === 200 && response.data) {
        return response.data
      } else {
        throw new Error('Request did not go through')
      }
    } catch (error) {
      handleErrorWithAxios(error)
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }
)

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    toggleStatus: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload
    },
    getUserId: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        if (!action.payload) {
          console.warn('Payload saknar data:', action.payload)
          state.active = false
          state.userName = 'Guest'
          state.loading = false
          state.error = 'User status unknown'
          return
        }

        const { isActive, username } = action.payload.data || {
          isActive: action.payload.isActive ?? false,
          username: action.payload.username ?? 'Guest',
        }

        state.active = isActive
        state.userName = username
        state.loading = false
        state.error = null
      })
      .addCase(fetchUserStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserStatus.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Failed to fetch status'
        state.active = false
        state.loading = false
      })
  },
})
export const { toggleStatus, getUserId } = statusSlice.actions
export default statusSlice.reducer
