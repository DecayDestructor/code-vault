import LandingPage from './pages/LandingPage'
import Nav from './Components/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import CreateSnippet from './pages/CreateSnippet'
import { Provider } from 'react-redux'
import { store } from './Contexts/store'
import { WithAuth } from './Components/WithAuth'
import { Login } from './pages/Login'
const App = () => {
  return (
    <div className="bg-white min-h-screen">
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
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}
export default App
