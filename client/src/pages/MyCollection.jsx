import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Card, CardBody, Tooltip } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getBookmarkedSnippets,
  getLikedSnippets,
  handleLike,
  handleSave,
} from '../../redux/slices/codeSnippet'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GitFork, Heart, Bookmark } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import Loading from '../Components/Loading'
const SnippetCard = ({
  name,
  description,
  date,
  snippetID,
  coding_language,
  forked,
  liked,
  saved,
}) => {
  const childrenVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'backOut' },
    },
  }

  const { user, isSignedIn } = useUser()
  const dispatch = useDispatch()
  const [likedState, setLikedState] = useState(liked)
  const [savedState, setSavedState] = useState(saved)

  const dateString = new Date(Date.parse(date)).toDateString()
  const handleLikeButtonClick = () => {
    if (isSignedIn) {
      dispatch(
        handleLike({
          type: likedState ? 'REMOVE_LIKE' : 'ADD_LIKE',
          payload: {
            snippetID,
            userId: user.id,
          },
        })
      )
    }
  }
  const handleSaveButtonClick = () => {
    if (isSignedIn) {
      // implement saving snippet logic
      dispatch(
        handleSave({
          type: savedState ? 'REMOVE_BOOKMARK' : 'ADD_BOOKMARK',
          payload: {
            snippetID,
            userId: user.id,
          },
        })
      )
    }
  }

  return (
    <motion.div
      className="flex font-inter-tight justify-between px-10  bg-gray-50 p-7 w-[45%] max-lg:w-full rounded-lg shadow-md flex-wrap items-start hover:scale-[1.005] transition-transform duration-250 ease-soft-spring m-3 grow mx-6 gap-8"
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
            <Link to={`/fork-snippet/${snippetID}`}>
              <GitFork
                size={18}
                fill={forked ? 'black' : 'none'}
                color={isSignedIn ? 'black' : 'grey'}
              />
            </Link>
          </button>
        </Tooltip>
        <Tooltip content="Like Snippet">
          <button
            disabled={!isSignedIn}
            onClick={() => {
              handleLikeButtonClick()
              setLikedState(!likedState)
              setLocalLikedSnippets(
                likedState
                  ? localLikedSnippets.filter((s) => s.id !== snippetID)
                  : [...localLikedSnippets, { id: snippetID, userId: user.id }]
              )
            }}
          >
            <Heart
              size={18}
              fill={likedState ? 'black' : 'none'}
              color={isSignedIn ? 'black' : 'grey'}
            />
          </button>
        </Tooltip>
        <Tooltip content="Bookmark">
          <button
            disabled={!isSignedIn}
            onClick={() => {
              handleSaveButtonClick()
              setSavedState(!savedState)
            }}
          >
            <Bookmark
              size={18}
              fill={savedState ? 'black' : 'none'}
              color={isSignedIn ? 'black' : 'grey'}
            />
          </button>
        </Tooltip>
      </div>
    </motion.div>
  )
}

export default function MyCollection() {
  const { user, isLoaded } = useUser()

  const [localLikedSnippets, setLocalLikedSnippets] = useState([])
  const [localSavedSnippets, setLocalSavedSnippets] = useState([])
  const { snippetReducer } = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
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

  useEffect(() => {
    if (isLoaded) {
      dispatch(getLikedSnippets(user.id))
      dispatch(getBookmarkedSnippets(user.id))
    }
  }, [dispatch, isLoaded, user.id])
  useEffect(() => {
    if (!snippetReducer.loading) {
      setLocalLikedSnippets(snippetReducer.likedSnippets)
      setLocalSavedSnippets(snippetReducer.savedSnippets)
    }
  })

  return (
    <div className="h-full w-full flex flex-col mt-5 px-4 gap-5 items-center font-inter-tight">
      <div className="flex flex-col w-full items-center justify-center">
        <Tabs
          aria-label="Options"
          className="w-full flex justify-center"
          variant="underlined"
        >
          <Tab key="liked" title="Liked">
            <Card className="w-full">
              <CardBody className="flex p-4 justify-center w-full">
                <motion.div
                  className="flex flex-wrap justify-center max-lg:flex-col w-full"
                  initial="hidden"
                  animate="visible"
                  variants={parentVariant}
                >
                  {localLikedSnippets?.length > 0 ? (
                    localLikedSnippets.map((snippet) => (
                      <SnippetCard
                        key={snippet.snippetID}
                        name={snippet.name}
                        description={snippet.description}
                        date={snippet.date}
                        snippetID={snippet.snippetID}
                        coding_language={snippet.coding_language}
                        liked={snippet.likes.includes(user?.id) || false}
                        saved={snippet.bookmarked.includes(user?.id) || false}
                        forked={snippet.forked.includes(user?.id) || false}
                      />
                    ))
                  ) : (
                    <h1>No snippets found</h1>
                  )}
                </motion.div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="saved" title="Saved">
            <Card className="w-full">
              <CardBody className="flex p-4 justify-center w-full">
                <motion.div
                  className="flex flex-wrap justify-center max-lg:flex-col w-full"
                  initial="hidden"
                  animate="visible"
                  variants={parentVariant}
                >
                  {localSavedSnippets.length > 0 ? (
                    localSavedSnippets.map((snippet) => (
                      <SnippetCard
                        key={snippet.snippetID}
                        name={snippet.name}
                        description={snippet.description}
                        date={snippet.date}
                        snippetID={snippet.snippetID}
                        coding_language={snippet.coding_language}
                        liked={snippet.likes.includes(user?.id) || false}
                        saved={snippet.bookmarked.includes(user?.id) || false}
                        forked={snippet.forked.includes(user?.id) || false}
                      />
                    ))
                  ) : (
                    <h1>No saved snippets found</h1>
                  )}
                </motion.div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
