import { configureStore } from '@reduxjs/toolkit'
import snippetReducer from './slices/codeSnippet.js'
import userReducer from './slices/userManagement.js'
import versionControlReducer from './slices/versionControl.js'
import { createDevTools } from '@redux-devtools/core'
export const store = configureStore(
  {
    reducer: {
      snippetReducer: snippetReducer,
      userReducer: userReducer,
      versionControlReducer: versionControlReducer,
    },
  },
  createDevTools
)
