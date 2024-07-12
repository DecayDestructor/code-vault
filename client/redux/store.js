import { configureStore } from '@reduxjs/toolkit'
import snippetReducer from './slices/codeSnippet.js'
import userReducer from './slices/userManagement.js'
import versionControlReducer from './slices/versionControl.js'
export const store = configureStore({
  reducer: {
    snippetReducer: snippetReducer,
    userReducer: userReducer,
    versionControlReducer: versionControlReducer,
  },
})
