import { configureStore } from '@reduxjs/toolkit'
import snippetReducer from './slices/codeSnippet.js'
import userReducer from './slices/userManagement.js'
export const store = configureStore({
  reducer: {
    snippet: snippetReducer,
    user: userReducer,
  },
})
