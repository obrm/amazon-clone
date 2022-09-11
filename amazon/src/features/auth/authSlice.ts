import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthState, NewUser } from './model'
import authService from './services/auth.service'

const initialState: AuthState = {
  user: null,
  jwt: null,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const register = createAsyncThunk(
  'auth/register',
  async (user: NewUser, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (err) {
      return thunkAPI.rejectWithValue('הרשמה נכשלה')
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.user = null
      })
  },
})

export default authSlice.reducer
