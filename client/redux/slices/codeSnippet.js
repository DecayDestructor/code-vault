import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit'

import axios from 'axios'
import { Trophy } from 'lucide-react'
import { toast } from 'sonner'

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
      toast.success('Snippet Added Successfully', {
        duration: 3000,
      })
    }
    return response.data
  } catch (error) {
    // Check if error.response is defined to handle API errors
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 3000,
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
      duration: 3000,
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
        duration: 3000,
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
      duration: 3000,
    })
    return response.data
  } catch (error) {
    console.error(error)
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 3000,
    })
  }
})
export const restoreVersion = createAsyncThunk(
  'restoreVersion',
  async (snippet) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/code-snippets/restore`,
        snippet
      )
      toast.success('Version restored successfully', {
        duration: 3000,
      })
      return response.data
    } catch (error) {
      console.error(error)
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong'
      toast.error(`${errorMessage}`, {
        duration: 3000,
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
        duration: 3000,
      })
    }
  }
)

export const getExploreSnippets = createAsyncThunk(
  'getExploreSnippets',
  async (searchParam) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/code-snippets/getAllBySearchParam/${searchParam}`
      )
      return response.data
    } catch (error) {
      console.error(error)
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong'
      toast.error(`${errorMessage}`, {
        duration: 3000,
      })
      return []
    }
  }
)

export const handleLike = createAsyncThunk('handleLike', async (obj) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/code-snippets/handleLike`,
      obj
    )
    return response.data //returns the updated snippet.
  } catch (error) {
    console.error(error)
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 3000,
    })
  }
})

export const handleSave = createAsyncThunk('handleSave', async (obj) => {
  try {
    const response = await axios.put(
      'http://localhost:5000/code-snippets/handleBookmark',
      obj
    )
    return response.data //returns the updated snippet.
  } catch (error) {
    console.error(error)
    const errorMessage =
      error.response?.data?.message || error.message || 'Something went wrong'
    toast.error(`${errorMessage}`, {
      duration: 3000,
    })
  }
})

export const getLikedSnippets = createAsyncThunk(
  'getLikedSnippets',
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/code-snippets/getLikedSnippets/${userId}`
      )
      return response.data
    } catch (err) {
      console.error(err)
      const errorMessage =
        err.response?.data?.message || err.message || 'Something went wrong'
      toast.error(`${errorMessage}`, {
        duration: 3000,
      })
    }
  }
)
export const getBookmarkedSnippets = createAsyncThunk(
  'getBookmarkedSnippets',
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/code-snippets/getBookmarkedSnippets/${userId}`
      )

      return response.data
    } catch (err) {
      console.error(err)
      const errorMessage =
        err.response?.data?.message || err.message || 'Something went wrong'
      toast.error(`${errorMessage}`, {
        duration: 3000,
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
    exploreSnippets: [],
    likedSnippets: [],
    savedSnippets: [],
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
      if (!action.payload) {
        return {
          ...state,
          loading: false,
        }
      }
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
      return {
        ...state,
        loading: false,
        categories: action.payload,
      }
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      return {
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(getExploreSnippets.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getExploreSnippets.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        exploreSnippets: action.payload,
      }
    })
    builder.addCase(getExploreSnippets.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(handleLike.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(handleLike.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        snippets: state.exploreSnippets.map((snippet) =>
          snippet.snippetID === action.payload.snippetID
            ? action.payload
            : snippet
        ),
      }
    })
    builder.addCase(handleLike.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(handleSave.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(handleSave.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        snippets: state.snippets.map((snippet) =>
          snippet.snippetID === action.payload.snippetID
            ? action.payload
            : snippet
        ),
      }
    })
    builder.addCase(handleSave.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(getLikedSnippets.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getLikedSnippets.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        likedSnippets: action.payload,
      }
    })
    builder.addCase(getLikedSnippets.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
    builder.addCase(getBookmarkedSnippets.pending, (state) => {
      return {
        ...state,
        loading: true,
      }
    })
    builder.addCase(getBookmarkedSnippets.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        savedSnippets: action.payload,
      }
    })
    builder.addCase(getBookmarkedSnippets.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
      }
    })
  },
})
export const { addCategory } = snippetSlice.actions
export default snippetSlice.reducer
