import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

export const WithAuth = ({ Component, rest }) => {
  const { isSignedIn } = useUser()
  // Destructure 'component' from props

  if (!isSignedIn) {
    console.log('not signed in')
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />
  }

  // Render the component with authentication
  return <Component {...rest} /> // Render the Component with the rest of the props
}
