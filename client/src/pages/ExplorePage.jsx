import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getExploreSnippets } from '../../redux/slices/codeSnippet'
import { Bookmark, GitFork, Heart, Search } from 'lucide-react'
import { Button } from '@nextui-org/react'
import Loading from '../Components/Loading'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'
const SnippetCard = ({
  name,
  description,
  date,
  snippetID,
  coding_language,
}) => {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // console.log(new Date(Date.parse(date)).toDateString())
  const dateString = new Date(Date.parse(date)).toDateString()
  return (
    <div className="flex font-inter-tight justify-between px-10 bg-gray-50 p-7 w-[45%] max-lg:w-full rounded-lg shadow-md flex-wrap items-start hover:scale-[1.005] transition-transform duration-250 ease-soft-spring m-3 grow mx-6">
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
          <button>
            <GitFork size={18} />
          </button>
        </Tooltip>
        <Tooltip content="Like Snippet">
          <button>
            <Heart size={18} />
          </button>
        </Tooltip>
        <Tooltip content="Bookmark">
          <button>
            <Bookmark size={18} />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

const ExplorePage = () => {
  const explorePageSnippets = useSelector(
    (state) => state.snippetReducer.exploreSnippets
  )
  const state = useSelector((state) => state.snippetReducer)
  console.log(state)

  const loading = useSelector((state) => state.snippetReducer.loading)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParam, setSearchParam] = useState('')
  useEffect(() => {
    dispatch(getExploreSnippets(searchParam))
  }, [dispatch, searchParam])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchParam(searchQuery)
    setSearchQuery('')
  }

  if (loading) {
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
        <div className="flex flex-wrap justify-center max-lg:flex-col w-full">
          {explorePageSnippets.length > 0 &&
            explorePageSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                name={snippet.name}
                description={snippet.description}
                date={snippet.date}
                snippetID={snippet.id}
                coding_language={snippet.coding_language}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
