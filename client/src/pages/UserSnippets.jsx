import { useUser } from '@clerk/clerk-react'
import { Button } from '@nextui-org/react'
import { getCategories, getSnippets } from '../../redux/slices/codeSnippet'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SnippetsList from '../Components/SnippetsList'
import { MoonLoader } from 'react-spinners'
import Loading from '../Components/Loading'
import CategoryCheckBox from '../Components/CategoryCheckBox'
const UserSnippets = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const snippets = useSelector((state) => state.snippetReducer)
  const user = useUser()
  const { page } = useParams()
  const pageNumber = parseInt(page, 10)

  // const [localSnippets, setLocalSnippets] = useState([])
  const [search, setSearch] = useSearchParams({ name: '', categories: [] })
  // console.log(search.get('categories'))
  const snippetNames = snippets.snippets.map((item) => {
    return item.name
  })
  // console.log(snippetNames)
  const categoryNames = snippets.categories
  // console.log(categoryNames)
  // console.log(search.get('categories').split(','))
  const [categories, setCategories] = useState([])
  // console.log(categories)
  useEffect(() => {
    if (user) {
      dispatch(getSnippets({ userId: user.user.id, pageNumber }))
      dispatch(getCategories(user.user.id))
    }
  }, [dispatch, user.user.id, pageNumber])
  if (snippets.loading) {
    return <Loading />
  }

  return (
    <div className="h-full w-full flex max-lg:flex-col mt-5 px-4 gap-5">
      <div className="lg:w-1/4 w-full lg:h-full flex lg:flex-col justify-start px-5 pt-3 gap-6">
        <div className="w-full max-lg:hidden ">
          <h3 className="font-lato lg:text-[30px]">
            Welcome, {user.user.firstName}
          </h3>
          <span className="font-inter-tight">Here are your snippets</span>
        </div>
        <div className="flex flex-col gap-5 max-lg:grow">
          <input
            type="text"
            placeholder="Search"
            className=" w-full px-3 py-2 rounded-lg border-medium border-black"
            onChange={(e) => {
              setSearch((prev) => {
                prev.set('name', e.target.value)
                return prev
              })
            }}
          />

          <div className="flex lg:flex-col gap-2 flex-wrap">
            <Button
              color="secondary"
              className=" w-full font-semibold font-lato tracking-wide max-md:text-[14px]"
              onClick={() => {
                navigate('/create-snippet')
              }}
            >
              Create Snippet
            </Button>
            <Button
              color="default"
              className=" w-full font-semibold font-lato tracking-wide"
            >
              Create Tag
            </Button>
          </div>
          <div className="flex lg:flex-col gap-2 flex-wrap max-lg:pb-5 max-lg:items-center justify-center">
            {categoryNames.map((category, index) => (
              <CategoryCheckBox
                categoryName={category}
                key={index}
                search={search}
                setSearch={setSearch}
                setCategories={setCategories}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="max-lg:mt-3 lg:h-full grow flex flex-col gap-5 px-4 py-3">
        <div className="w-full lg:hidden flex flex-col px-5">
          <h3 className="font-lato text-[30px]">
            Welcome, {user.user.firstName}
          </h3>
          <span className="font-inter-tight">Here are your snippets</span>
        </div>
        {snippets.loading ? (
          <div>
            <div className="flex items-center justify-center h-full">
              <MoonLoader size={30} color="#000000" />
            </div>
          </div>
        ) : snippets.snippets ? (
          <SnippetsList
            snippets={snippets.snippets}
            name={search.get('name')}
            categories={
              search.get('categories')
                ? search.get('categories').split(',').splice(1)
                : []
            }
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="font-lato text-center text-black tracking-widest">
              No Snippets Found
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}
export default UserSnippets
