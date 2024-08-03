import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit'

import axios from 'axios'
import { toast } from 'sonner'

export const addSnippet = createAsyncThunk('addSnippet', async (snippet) => {
  console.log(snippet)
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
      toast.success('Snippet Added Successfully', {
        duration: 5000,
      })
    }
    return response.data
  } catch (error) {
    // Check if error.response is defined to handle API errors
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 5000,
    })

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
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 5000,
    })
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
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong'
      toast.error(`${errorMessage}`, {
        duration: 5000,
      })
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

export const editSnippet = createAsyncThunk('editSnippet', async (snippet) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/edit-snippets/edit`,
      snippet,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    toast.success('Snippet updated successfully', {
      duration: 5000,
    })
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
export const restoreVersion = createAsyncThunk(
  'restoreVersion',
  async (snippet) => {
    console.log(snippet)
    try {
      const response = await axios.put(
        `http://localhost:5000/code-snippets/restore`,
        snippet
      )
      toast.success('Version restored successfully', {
        duration: 5000,
      })
      return response.data
    } catch (error) {
      console.error(error)
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong'
      toast.error(`${errorMessage}`, {
        duration: 5000,
      })
    }
  }
)
export const getCategories = createAsyncThunk(
  'getCategories',
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/code-snippets/getCategoriesByUserID/${userId}`
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
  }
)

const snippetSlice = createSlice({
  name: 'fetchSnippet',
  initialState: {
    snippets: [],
    oneSnippet: null,
    loading: false,
    error: null,
    edits: [],
    categories: [],
  },
  reducers: {
    addCategory: (state, action) => {
      //check if state already contains the action.payload
      // if not, add it to the state.categories array
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSnippet.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addSnippet.fulfilled, (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        snippets: [...state.snippets, action.payload],
        // categories: [...state.categories, action.payload.categories],
      }
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
    builder.addCase(deleteSnippet.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteSnippet.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        snippets: state.snippets.filter(
          (snippet) => snippet._id !== action.payload.snippet._id
        ),
      }
    })
    builder.addCase(deleteSnippet.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(editSnippet.pending, (state) => {
      state.loading = true
    })
    builder.addCase(editSnippet.fulfilled, (state, action) => {
      console.log(state.snippets)
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        snippets: state.snippets.map((snippet) => {
          return snippet.snippetID === action.payload.snippetID
            ? action.payload
            : snippet
        }),
        oneSnippet: action.payload,
        categories: [...state.categories, action.payload.categories],
      }
    })
    builder.addCase(editSnippet.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(restoreVersion.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(restoreVersion.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        snippets: state.snippets.map((snippet) =>
          snippet.snippetID === action.payload.snippetID
            ? action.payload
            : snippet
        ),
        oneSnippet: action.payload,
      }
    })
    builder.addCase(restoreVersion.rejected, (state, action) => {
      return {
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(getCategories.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      const newCategories = action.payload.filter(
        (category) => !state.categories.includes(category)
      )
      console.log('new categories :' + newCategories)

      return {
        ...state,
        loading: false,
        categories: [...state.categories, ...newCategories],
      }
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      return {
        loading: false,
        error: action.error.message,
      }
    })
  },
})
export const { addCategory } = snippetSlice.actions
export default snippetSlice.reducer
