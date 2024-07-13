import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit'

import axios from 'axios'
import { toast } from 'sonner'

export const getHistory = createAsyncThunk('getHistory', async (obj) => {
  const { snippetID, userId } = obj

  try {
    const response = await axios.get(
      'http://localhost:5000/edit-snippets/' + snippetID + '/' + userId
    )
    return response.data
  } catch (error) {
    console.error(error)
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 5000,
    })
  }
})

export const getEdit = createAsyncThunk('getEdit', async (editID) => {
  try {
    const response = await axios.get(
      'http://localhost:5000/edit-snippets/' + editID
    )
    return response.data
  } catch (error) {
    console.error(error)
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 5000,
    })
  }
})

export const deleteEdit = createAsyncThunk('deleteEdit', async (editID) => {
  try {
    const response = await axios.delete(
      'http://localhost:5000/edit-snippets/' + editID
    )
    return response.data
  } catch (err) {
    console.error(err)
    const errorMessage =
      err.response?.data?.message || err.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 5000,
    })
  }
})

export const deleteALl = createAsyncThunk('deleteALl', async (snippetID) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/edit-snippets/${snippetID}/all`
    )
    return response.data
  } catch (err) {
    console.error(err)
    const errorMessage =
      err.response?.data?.message || err.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 5000,
    })
  }
})

const versionControl = createSlice({
  name: 'versionControl',
  initialState: {
    loading: false,
    error: null,
    edits: [],
    oneEdit: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistory.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getHistory.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        edits: action.payload,
      }
    })
    builder.addCase(getHistory.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(deleteEdit.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(deleteEdit.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        edits: state.edits.filter(
          (edit) => edit.editID !== action.payload.snippet.editID
        ),
      }
    })
    builder.addCase(deleteEdit.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(getEdit.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getEdit.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        oneEdit: action.payload,
      }
    })
    builder.addCase(getEdit.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(deleteALl.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(deleteALl.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        edits: [],
        oneEdit: null,
      }
    })
    builder.addCase(deleteALl.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
  },
})

export default versionControl.reducer
