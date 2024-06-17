import { SignIn, useUser } from '@clerk/clerk-react'
import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
const Login = () => {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()
  return isSignedIn ? (
    <Navigate to={'/'} />
  ) : (
    <div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
          ease: 'circInOut',
          delay: 0.1,
        }}
        className="w-full h-screen flex flex-col items-center justify-center"
      >
        <SignIn
          appearance={{
            baseTheme: [],
          }}
        />

        <Button
          color="default"
          className="mt-10 p-2 flex items-center justify-center text-center font-inter-tight font-semibold"
          onClick={() => {
            navigate('/')
          }}
        >
          Home
        </Button>
      </motion.div>
    </div>
  )
}
export default Login
