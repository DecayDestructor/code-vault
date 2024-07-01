import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'sonner'

// export const getUser = createAsyncThunk('getUser', async (email) => {
//     try {
//         const response = await axios.get('http://localhost:5000/users/me')
//         return response.data
//     } catch (error) {
//         const errorMessage = error.response?.data?.message || error.message || 'Something went wrong'
//         toast.error(`${errorMessage}`, {
//             duration: 5000,
//         })
//         return
//     }
// })

export const registerUser = createAsyncThunk('registerUser', async (user) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/user-management/register',
      user
    )
    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 5000,
    })
    return
  }
})

export const allowAccess = createAsyncThunk('allowAccess', async (obj) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/user-management/add-access',
      obj
    )
    toast.success(response.data?.message, {
      duration: 5000,
    })
    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 5000,
    })
  }
})

const userStateSlice = createSlice({
  name: 'UserSlice',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    access: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allowAccess.fulfilled, (state, action) => {
      state.access = [...state.access, action.payload]
      state.isLoading = false
    })
    builder.addCase(allowAccess.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(allowAccess.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export default userStateSlice.reducer
