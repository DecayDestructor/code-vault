import { useUser } from '@clerk/clerk-react'
import { Button } from '@nextui-org/react'
import { getSnippets } from '../../redux/slices/codeSnippet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SnippetsList from '../Components/SnippetsList'
const UserSnippets = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const snippets = useSelector((state) => state.snippet)
  console.log(snippets)
  const user = useUser()
  const [searchParams,setSearchParams] = useSearchParams()
  const page=searchParams.get('page') || 0
  useEffect(() => {
    dispatch(getSnippets(user?.user.id,page))
  }, [dispatch, user.user.id,page])
  return (
    <div className="h-full w-full flex max-lg:flex-col mt-5 px-4">
      {/* <div className=""></div> */}
      {/* //create a sidebar with the name of the user and a search bar */}
      <div className="lg:w-1/4 w-full max-lg:h-[20%] lg:h-full flex lg:flex-col justify-start px-5 pt-3 gap-6">
        <div className="w-full max-lg:hidden ">
          <h3 className="font-lato lg:text-[30px]">
            Welcome, {user.user.firstName}
          </h3>
          <span className="font-inter-tight">Here are your snippets</span>
        </div>
        <div className="flex flex-col gap-2 max-lg:grow">
          <input
            type="text"
            placeholder="Search"
            className="w-5/6 px-3 py-2 rounded-lg border-medium border-black"
          />
        </div>
        <div className="flex lg:flex-col gap-2">
          <Button
            color="secondary"
            className="lg:w-5/6  font-semibold font-lato tracking-wide max-md:text-[14px]"
            onClick={() => {
              navigate('/create-snippet')
            }}
          >
            Create Snippet
          </Button>
          <Button
            color="default"
            className="lg:w-5/6 font-semibold font-lato tracking-wide"
          >
            Create Tag
          </Button>
        </div>
      </div>
      <div className=" lg:h-full grow flex flex-col px-4 py-3">
        <div className="w-full lg:hidden flex flex-col px-5">
          <h3 className="font-lato text-[30px]">
            Welcome, {user.user.firstName}
          </h3>
          <span className="font-inter-tight">Here are your snippets</span>
        </div>
        <SnippetsList/>
        <SnippetsList/>
        <SnippetsList/>
        <SnippetsList/>
        <SnippetsList/>
      </div>
    </div>
  )
}
export default UserSnippets
