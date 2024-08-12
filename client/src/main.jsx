import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider, SignedIn } from '@clerk/clerk-react'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) throw new Error('VITE_CLERK_PUBLISHABLE_KEY is not set')
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
)
