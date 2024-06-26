import Nav from './Components/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { lazy } from 'react'
import { User } from 'lucide-react'
import { Toaster } from 'sonner'

const Login = lazy(() => {
  return import('./pages/Login')
})
const WithAuth = lazy(() => {
  return import('./Components/WithAuth') //component which requires authentication
})
//lazy load Landing Page

const LandingPage = lazy(() => {
  return import('./pages/LandingPage')
})
//lazy load CreateSnippet

const CreateSnippet = lazy(() => {
  return import('./pages/CreateSnippet')
})

const UserSnippets = lazy(() => {
  return import('./pages/UserSnippets')
})
const Snippet = lazy(() => {
  return import('./pages/Snippet')
})
const App = () => {
  return (
    <div className="bg-white h-screen w-screen">
      <Toaster richColors position="top-center" className="font-inter-tight" />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route
                path="/create-snippet"
                element={<WithAuth Component={CreateSnippet} />}
              />
              <Route
                path="/user-snippets/:page"
                element={<WithAuth Component={UserSnippets} />}
              />
              <Route path="/snippet/:snippetID" element={<Snippet />} />
            </Route>
            <Route
              path="*"
              element={
                <h1 className="h-full w-full flex items-center justify-center mainHeader">
                  404 error
                </h1>
              }
            />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}
export default App
