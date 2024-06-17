import { configureStore } from '@reduxjs/toolkit'
import snippetReducer from './slices/codeSnippet.js'
export const store = configureStore({
  reducer: {
    snippet: snippetReducer,
  },
})
