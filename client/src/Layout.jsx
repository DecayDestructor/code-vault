import { Outlet } from 'react-router-dom'
import Nav from './Components/Nav'
import { useSelector } from 'react-redux'
import { lazy, Suspense } from 'react'
import { MoonLoader } from 'react-spinners'
const Layout = () => {
  return (
    <>
      <Nav />
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <MoonLoader color="#000000" loading size={30} />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  )
}
export default Layout
