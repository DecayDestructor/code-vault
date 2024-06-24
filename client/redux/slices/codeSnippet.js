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

    throw error
  }
})

export const getSnippets = createAsyncThunk('getSnippets', async (obj) => {
  const { userId, pageNumber } = obj
  try {
    const response = await axios.get(
      `http://localhost:5000/code-snippets/getAllByUserID/${userId}/${pageNumber}`
    )
    return response.data
  } catch (error) {
    // Check if error.response is defined to handle API errors
    console.error(error)
  }
})

export const getOneSnippet = createAsyncThunk(
  'getOneSnippet',
  async (snippetID) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/code-snippets/getOneBySnippetID/${snippetID}`
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)

export const deleteSnippet = createAsyncThunk('deleteSnippet', async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/code-snippets/${id}`
    )
    return response.data
  } catch (error) {
    // Check if error.response is defined to handle API errors
    console.error(error)
  }
})

const snippetSlice = createSlice({
  name: 'fetchSnippet',
  initialState: {
    snippets: [],
    oneSnippet: null,
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
    builder.addCase(getSnippets.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getSnippets.fulfilled, (state, action) => {
      state.loading = false
      state.snippets = action.payload
    })
    builder.addCase(getSnippets.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(getOneSnippet.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getOneSnippet.fulfilled, (state, action) => {
      state.loading = false
      state.oneSnippet = action.payload
    })
  },
})

export default snippetSlice.reducer
