import { Button } from '@nextui-org/react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneSnippet } from '../../redux/slices/codeSnippet.js'
import { getHistory } from '../../redux/slices/versionControl.js'
import Loading from '../Components/Loading.jsx'
import VersionControlCard from '../Components/VersionControlCard.jsx'

const VersionControl = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { snippetID } = useParams()
  const dispatch = useDispatch()
  const snippet = useSelector((state) => state)
  const [localEdits, setLocalEdits] = useState([])
  const [filteredEdits, setFilteredEdits] = useState([])

  useEffect(() => {
    dispatch(getOneSnippet(snippetID))
  }, [dispatch, snippetID])

  const [searchParams, setSearchParams] = useSearchParams({
    name: '',
    categories: [],
  })

  useEffect(() => {
    if (snippet.snippetReducer.oneSnippet?.userId) {
      dispatch(
        getHistory({
          snippetID,
          userId: snippet.snippetReducer.oneSnippet.userId,
        })
      )
    }
  }, [dispatch, snippetID, snippet.snippetReducer?.oneSnippet?.userId])

  useEffect(() => {
    setLocalEdits(
      snippet?.versionControlReducer?.edits
        ? snippet.versionControlReducer.edits
        : []
    )
  }, [snippet.versionControlReducer.edits])

  useEffect(() => {
    const nameFilter = searchParams.get('name')?.toLowerCase() || ''
    const filtered = localEdits.filter((edit) => {
      return (
        edit.editName.toLowerCase().includes(nameFilter) ||
        edit.name.toLowerCase().includes(nameFilter)
      )
    })
    setFilteredEdits(filtered)
  }, [searchParams, localEdits])

  if (
    snippet.versionControlReducer.loading ||
    !snippet.snippetReducer.oneSnippet
  ) {
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
            Please find the previous version of '
            {snippet.snippetReducer.oneSnippet.name}' here
          </span>
        </div>
        <div className="flex flex-col gap-2 max-lg:grow">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 rounded-lg border-medium border-black"
            onChange={(e) => {
              setSearchParams((prevParams) => {
                const newParams = new URLSearchParams(prevParams)
                newParams.set('name', e.target.value)
                return newParams
              })
            }}
            value={searchParams.get('name') || ''}
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
          Please find the previous version of '
          {snippet.snippetReducer.oneSnippet.name}' here
        </div>
        {!filteredEdits || filteredEdits.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="font-lato text-center text-black tracking-widest">
              No Edits Found
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredEdits.map((item, index) => {
              return <VersionControlCard key={index} {...item} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}
export default VersionControl
