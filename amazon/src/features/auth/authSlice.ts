import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { AuthState, NewUser, LoginUser, DisplayUser, Jwt } from './model'
import authService from './services/auth.service'

const storedUser: string | null = localStorage.getItem('user')
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null

const storedJwt: string | null = localStorage.getItem('jwt')
const jwt: Jwt = !!storedJwt ? JSON.parse(storedJwt) : null

const initialState: AuthState = {
  user,
  jwt,
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

export const login = createAsyncThunk(
  'auth/login',
  async (user: LoginUser, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (err) {
      return thunkAPI.rejectWithValue('הכניסה נכשלה')
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const verifyJwt = createAsyncThunk(
  'auth/verify-jwt',
  async (jwt: string, thunkAPI) => {
    try {
      return await authService.verifyJwt(jwt)
    } catch (err) {
      return thunkAPI.rejectWithValue('האימות נכשל')
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
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jwt = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.isAuthenticated = false
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.jwt = null
        state.isAuthenticated = false
      })
      // VERIFY JWT
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isAuthenticated = action.payload
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isAuthenticated = false
      })
  },
})

export const { reset } = authSlice.actions

export const selectedUser = (state: RootState) => {
  return state.auth
}
export default authSlice.reducer
