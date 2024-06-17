import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit'

import axios from 'axios'

export const addSnippet = createAsyncThunk('addSnippet', async (snippet) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/code-snippets/',
      snippet,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.status === 200 || response.status === 201) {
      alert('Snippet saved successfully')
    }
    return response.data
  } catch (error) {
    // Check if error.response is defined to handle API errors
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    alert(`Error: ${errorMessage}`)

    // Optionally, you can throw the error to be handled by the caller
    throw error
  }
})

export const getSnippets = createAsyncThunk('getSnippets', async () => {
  const response = await axios.get('http://localhost:5000/code-snippets/')
  return response.data
})

const snippetSlice = createSlice({
  name: 'fetchSnippet',
  initialState: {
    snippets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addSnippet.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addSnippet.fulfilled, (state, action) => {
      state.loading = false
      state.snippets.push(action.payload)
    })
    builder.addCase(addSnippet.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export default snippetSlice.reducer
