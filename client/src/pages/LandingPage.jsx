import { motion } from 'framer-motion'
import { getStartedFeatures, header } from '../data/LandingPage'
import { features } from '../data/LandingPage'
import { pointers } from '../data/LandingPage'
import CustomCard from '../Components/CustomCard'
import { Code, Github, Linkedin, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { getUser, registerUser } from '../../redux/slices/userManagement'
import { MoonLoader } from 'react-spinners'

const LandingPage = () => {
  const { user, isSignedIn } = useUser()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.userReducer)
  useEffect(() => {
    const checkAndRegisterUser = async () => {
      if (isSignedIn) {
        dispatch(getUser(user.id))
        if (!userState.user) {
          dispatch(
            registerUser({
              name: user.fullName,
              email: user.primaryEmailAddress.emailAddress,
              userId: user.id,
              profilePicture: user.imageUrl,
            })
          )
        }
      }
    }
    checkAndRegisterUser()
  }, [dispatch, isSignedIn])

  if (userState.isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <MoonLoader color="#000000" loading size={30} />
      </div>
    )
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const mainVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  }

  const subHeaderVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.4,
      },
    },
  }

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        stiffness: 200,
        damping: 10,
      },
    },
  }

  const PopUpHeader = ({ text, variants }) => {
    return (
      <motion.h1 variants={variants} className="mainHeader text-center">
        {text}
      </motion.h1>
    )
  }

  const PopUpMiniHeader = ({ text, variants }) => {
    return (
      <motion.h3 variants={variants} className="miniHeader text-center">
        {text}
      </motion.h3>
    )
  }

  const PopUpList = ({ text, className, number, variants }) => {
    return (
      <motion.div variants={variants} className={className}>
        {text ? (
          <span className="font-extrabold">{number}. </span>
        ) : (
          <span></span>
        )}
        {text}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={mainVariants}
      initial="hidden"
      animate="visible"
      className="mt-10 min-w-full"
    >
      <motion.div variants={mainVariants} className="min-w-full flex flex-col">
        <motion.h1
          className="font-lato text-center text-black tracking-widest"
          variants={textVariants}
        >
          {header.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              variants={letterVariants}
              className="inline-block px-1 md:text-[65px] sm:text-[40px] max-sm:text-[30px] font-[800]"
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            className="font-lato md:text-2xl sm:text-xl max-sm:text-lg font-[400] text-black tracking-widest"
            variants={letterVariants}
          >
            <br />
            Saving your snippets just got easier
          </motion.span>
        </motion.h1>
      </motion.div>
      <motion.div className="mt-40 px-20">
        <PopUpHeader text="Why Code Vault?" variants={letterVariants} />
        <motion.div
          variants={mainVariants}
          className="grid lg:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-1 gap-4 gap-y-10 mt-5"
        >
          {pointers.map((text, index) => (
            <motion.div key={index} variants={mainVariants}>
              <PopUpMiniHeader
                text={text.header}
                variants={subHeaderVariants}
              />
              <PopUpList
                text={text.description}
                variants={letterVariants}
                className="descriptionText"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div className="mt-40 px-20" variants={mainVariants}>
        <PopUpHeader text="Features" variants={mainVariants} />
        <motion.div
          variants={mainVariants}
          className="grid lg:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-1 gap-4 mt-5"
        >
          {features.map((feature, index) => (
            <PopUpList
              key={index}
              text={`${feature}`}
              number={index + 1}
              variants={letterVariants}
              className="flex gap-3 px-3 mt-3 lg:text-xl py-2 font-inter-tight tracking-wide md:text-lg max-sm:text-medium"
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div className="mt-40 px-20 text-center max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
        <PopUpHeader text="Get Started" variants={mainVariants} />
        <motion.div
          variants={mainVariants}
          className="grid lg:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-1 gap-4 gap-y-10 my-20 text-center"
        >
          {getStartedFeatures.map((text, index) => (
            <motion.div key={index} variants={letterVariants} className="">
              <CustomCard
                src={<User />}
                header={text.title}
                link={text.link}
                action={text.action}
                text={text.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <section className="bg-black text-gray-400 pt-40 pb-20 px-40 flex flex-col items-center gap-32">
        <p className="my-4 font-inter-tight text-lg">
          Welcome to Code Vault, a passion project born from the desire to
          create a central hub for developers to organize, share, and discover
          code snippets. As a solo developer, I understand the challenges of
          managing and finding snippets scattered across various platforms and
          projects. That's why I've built Code Vault to streamline your workflow
          and empower you to focus on what you do best – coding. At Code Vault,
          the mission is to democratize access to code knowledge and foster
          collaboration within the developer community. Whether you're a
          seasoned developer looking to share your expertise or a beginner eager
          to learn from others, Code Vault is your go-to destination. With
          features like intuitive snippet organization and seamless sharing
          options, Code Vault offers everything you need to elevate your coding
          experience. Join me on this exciting journey as we build a platform
          that puts the power of code at your fingertips.
        </p>
        <div className="flex gap-10 items-center justify-center ">
          <Linkedin
            fill="gray"
            size={30}
            className="cursor-pointer hover:bg-linkedin p-1 text-white transition-colors duration-250 ease-in-out rounded-md"
          ></Linkedin>
          <Github
            href="https://github.com/DecayDestructor"
            fill="white"
            size={30}
            className="cursor-pointer hover:bg-gray-600 p-1 text-white transition-colors duration-250 ease-in-out rounded-md"
          />
          <Code
            href="https://leetcode.com/u/aaryanmantri29/"
            fill="gray"
            size={30}
            className="cursor-pointer hover:bg-yellow-600 p-1 text-white transition-colors duration-250 ease-in-out rounded-md"
          />
        </div>
      </section>
    </motion.div>
  )
}

export default LandingPage
