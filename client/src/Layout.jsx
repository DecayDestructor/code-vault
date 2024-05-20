import { Outlet } from 'react-router-dom'
import Nav from './Components/Nav'
import { useSelector } from 'react-redux'

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}
export default Layout
