import { Button } from '@nextui-org/react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory, getOneSnippet } from '../../redux/slices/codeSnippet.js'
import Loading from '../Components/Loading.jsx'
import VersionControlCard from '../Components/VersionControlCard.jsx'

const VersionControl = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { snippetID } = useParams()
  const dispatch = useDispatch()
  const snippet = useSelector((state) => state.snippetReducer)
  console.log(snippet)

  useEffect(() => {
    dispatch(getOneSnippet(snippetID))
  }, [dispatch, snippetID])

  useEffect(() => {
    if (snippet.oneSnippet?.userId) {
      dispatch(getHistory({ snippetID, userId: snippet.oneSnippet.userId }))
    }
  }, [dispatch, snippetID, snippet.oneSnippet?.userId])

  if (snippet.loading || !snippet.oneSnippet) {
    return <Loading />
  }

  return (
    <div className="h-full w-full flex max-lg:flex-col mt-5 px-4 gap-5">
      <div className="lg:w-1/4 w-full max-lg:h-[20%] lg:h-full flex lg:flex-col justify-start px-5 pt-3 gap-6">
        <div className="w-full max-lg:hidden">
          <h3 className="font-lato lg:text-[30px]">
            Welcome, {user.firstName}
          </h3>
          <span className="font-inter-tight">
            Please find the previous version of '{snippet.oneSnippet.name}' here
          </span>
        </div>
        <div className="flex flex-col gap-2 max-lg:grow">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 rounded-lg border-medium border-black"
          />

          <div className="flex lg:flex-col gap-2 flex-wrap">
            <Button
              color="secondary"
              className="w-full font-semibold font-lato tracking-wide max-md:text-[14px]"
              onClick={() => {
                navigate('/edit-snippet/' + snippetID)
              }}
            >
              Edit Snippet
            </Button>
            <Button
              color="default"
              className="w-full font-semibold font-lato tracking-wide"
              onClick={() => {
                navigate('/create-snippet')
              }}
            >
              Create Snippet
            </Button>
          </div>
        </div>
      </div>
      <div className="max-lg:mt-3 lg:h-full grow flex flex-col gap-5 px-4 py-3">
        <div className="w-full lg:hidden flex flex-col px-5">
          <h3 className="font-lato text-[30px]">Welcome</h3>
          Please find the previous version of '{snippet.oneSnippet.name}' here
        </div>
        {!snippet.oneSnippet || snippet.oneSnippet.length == 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="font-lato text-center text-black tracking-widest">
              No Snippets Found
            </h1>
          </div>
        ) : (
          <div>
            {snippet.edits.map((item, index) => {
              return (
                <VersionControlCard
                  key={index}
                  editMsg={item.editMessage}
                  name={item.editName}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
export default VersionControl