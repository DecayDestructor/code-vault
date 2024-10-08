import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { lazy } from 'react'
import { Toaster } from 'sonner'
import { LazyMotion } from 'framer-motion'

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

const EditSnippet = lazy(() => {
  return import('./pages/EditSnippet')
})

const VersionControl = lazy(() => {
  return import('./pages/VersionControl')
})

const PreviousVersion = lazy(() => {
  return import('./pages/PreviousVersion')
})

const ExplorePage = lazy(() => {
  return import('./pages/ExplorePage')
})

const ForkSnippet = lazy(() => {
  return import('./pages/ForkSnippet')
})

const MyCollection = lazy(() => {
  return import('./pages/MyCollection')
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
                element={
                  <WithAuth Component={CreateSnippet} route="/create-snippet" />
                }
              />
              <Route
                path="/user-snippets/:page"
                element={
                  <WithAuth
                    Component={UserSnippets}
                    route="/user-snippets/:page"
                  />
                }
              />
              <Route path="/snippet/:snippetID" element={<Snippet />} />
              <Route
                path="/edit-snippet/:snippetID"
                element={<WithAuth Component={EditSnippet} />}
              />
              <Route
                path="/snippet/:snippetID/history"
                element={<WithAuth Component={VersionControl} />}
              />
              <Route
                path="/snippet/:snippetID/version/:editID"
                element={<PreviousVersion />}
              />
              <Route path="/explore-snippets" element={<ExplorePage />} />
              <Route
                path="/explore-snippets/:searchParam"
                element={<ExplorePage />}
              />
              <Route
                path="/fork-snippet/:snippetID"
                element={<WithAuth Component={ForkSnippet} />}
              />
              <Route
                path="/my-collection"
                element={<WithAuth Component={MyCollection} />}
              />
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
