import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

export const getUser = createAsyncThunk('getUser', async (userId) => {
  try {
    const response = await axios.get(
      'http://localhost:5000/user-management/getUser/' + userId
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

export const registerUser = createAsyncThunk('registerUser', async (user) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/user-management/register',
      user
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

export const removeAccess = createAsyncThunk('removeAccess', async (obj) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/user-management/remove-access',
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
  reducers: {
    setAccess: (state, action) => {
      state.access = action.payload.allowedUsers
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return { ...state, isLoading: false, user: action.payload, error: null }
    })
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        isLoading: false,
        error: action.error.message,
      }
    })

    builder.addCase(getUser.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      }
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      }
    })

    builder.addCase(registerUser.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      }
    })

    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        isLoading: false,
        error: action.error.message,
      }
    })

    builder.addCase(allowAccess.fulfilled, (state, action) => {
      const email = action.payload.user.email

      return {
        ...state,
        isLoading: false,
        access: [...state.access, email],
      }
    })
    builder.addCase(allowAccess.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(allowAccess.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(removeAccess.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        access: state.access.filter(
          (access) => access !== action.payload.user.email
        ),
      }
    })
    builder.addCase(removeAccess.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(removeAccess.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})
export const { setAccess } = userStateSlice.actions
export default userStateSlice.reducer
