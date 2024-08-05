import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getExploreSnippets } from '../../redux/slices/codeSnippet'
import { Search, Bookmark, GitFork, Heart } from 'lucide-react'
import Loading from '../Components/Loading'
import { Tooltip } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/clerk-react'
import { getUser, registerUser } from '../../redux/slices/userManagement'

const SnippetCard = ({
  name,
  description,
  date,
  snippetID,
  coding_language,
  childrenVariant,
  liked,
  saved,
  forked,
}) => {
  const { user, isSignedIn } = useUser()
  const dispatch = useDispatch()

  const dateString = new Date(Date.parse(date)).toDateString()
  const handleLikeButtonClick = () => {
    // if (isSignedIn) {
    //   dispatch(
    //      ? { type: 'DELETE_LIKE', payload: { snippetID, userID: user.id } }
    //       : { type: 'ADD_LIKE', payload: { snippetID, userID: user.id } }
    //   )
    // }
  }

  return (
    <motion.div
      className="flex font-inter-tight justify-between px-10 bg-gray-50 p-7 w-[45%] max-lg:w-full rounded-lg shadow-md flex-wrap items-start hover:scale-[1.005] transition-transform duration-250 ease-soft-spring m-3 grow mx-6"
      variants={childrenVariant}
    >
      <div className="flex flex-col justify-between gap-4 mb-4">
        <Link
          className="miniHeader md:text-xl max-md:text-medium font-bold tracking-wide"
          to={`/snippet/${snippetID}`}
        >
          {name}
        </Link>
        <p className="text-gray-600 max-md:text-sm">{description}</p>
      </div>
      <div className="mb-4 max-md:text-sm">
        <p>{dateString}</p>
      </div>
      <div className="mb-4 max-md:text-sm">
        <p>
          {coding_language.charAt(0).toUpperCase() + coding_language.slice(1)}
        </p>{' '}
      </div>
      <div className="flex gap-5 justify-between items-center">
        <Tooltip content="Fork">
          <button disabled={!isSignedIn}>
            <GitFork size={18} fill={forked ? 'black' : 'none'} />
          </button>
        </Tooltip>
        <Tooltip content="Like Snippet">
          <button disabled={!isSignedIn}>
            <Heart size={18} fill={liked ? 'black' : 'none'} />
          </button>
        </Tooltip>
        <Tooltip content="Bookmark">
          <button disabled={!isSignedIn}>
            <Bookmark size={18} fill={saved ? 'black' : 'none'} />
          </button>
        </Tooltip>
      </div>
    </motion.div>
  )
}

const ExplorePage = () => {
  const { isSignedIn, user, isLoaded } = useUser()

  const parentVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const childrenVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'backOut' },
    },
  }

  const explorePageSnippets = useSelector(
    (state) => state.snippetReducer.exploreSnippets
  )
  const loading = useSelector((state) => state.snippetReducer.loading)
  const userState = useSelector((state) => state.userReducer.user)

  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    dispatch(getExploreSnippets(searchParam))
  }, [dispatch, searchParam])

  useEffect(() => {
    const checkAndRegisterUser = async () => {
      if (isLoaded && isSignedIn) {
        dispatch(getUser(user.id))
        if (!userState) {
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
  }, [dispatch, isSignedIn, JSON.stringify(user)])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchParam(searchQuery)
    setSearchQuery('')
  }

  if (loading || !isLoaded) {
    return <Loading />
  }

  return (
    <div className="h-full w-full flex flex-col mt-5 px-4 gap-5 items-center">
      <div className="flex flex-col w-[80%] gap-4 items-center font-inter-tight">
        <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full rounded-xl focus:outline-none"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
              <button type="submit">
                <Search />
              </button>
            </div>
          </div>
        </form>
        {searchParam.trim() !== '' && explorePageSnippets.length === 1 ? (
          <p className="text-gray-600 max-md:text-sm">
            Found {explorePageSnippets.length} snippet
          </p>
        ) : (
          searchParam.trim() !== '' && (
            <p className="text-gray-600 max-md:text-sm">
              Found {explorePageSnippets.length} snippets
            </p>
          )
        )}
        <motion.div
          className="flex flex-wrap justify-center max-lg:flex-col w-full"
          initial="hidden"
          animate="visible"
          variants={parentVariant}
        >
          {explorePageSnippets.length > 0 &&
            explorePageSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.snippetID}
                name={snippet.name}
                description={snippet.description}
                date={snippet.date}
                snippetID={snippet.snippetID}
                coding_language={snippet.coding_language}
                liked={snippet.likes.includes(user.id)}
                saved={snippet.bookmarked.includes(user.id)}
                forked={snippet.forked.includes(user.id)}
                childrenVariant={childrenVariant}
              />
            ))}
        </motion.div>
      </div>
    </div>
  )
}

export default ExplorePage
