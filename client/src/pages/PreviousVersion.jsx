import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneSnippet } from '../../redux/slices/codeSnippet'
import { MoonLoader } from 'react-spinners'
import AceEditor from 'react-ace'
import { ShieldAlert } from 'lucide-react'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'
import { useUser } from '@clerk/clerk-react'

import { setAccess } from '../../redux/slices/userManagement'
import axios from 'axios'
import { getEdit } from '../../redux/slices/versionControl'
import RestoreVersionModal from '../Components/RestoreVersionModal'
const Snippet = () => {
  const { snippetID, editID } = useParams()
  const snippet = useSelector((state) => state.snippetReducer)
  const editReducer = useSelector((state) => state.versionControlReducer)
  const { allowedUsers } = snippet.oneSnippet || []
  const dispatch = useDispatch()
  const { user, isSignedIn } = useUser()
  const [name, setName] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  useEffect(() => {
    dispatch(getOneSnippet(snippetID))
    dispatch(setAccess({ allowedUsers }))
    const getOwnerOfSnippet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user-management/get-owner/${snippetID}`
        )
        console.log(response)

        setName(response.data.name)
        setProfilePicture(response.data.profilePicture)
      } catch (error) {
        console.error(error)
      }
    }
    getOwnerOfSnippet()
    dispatch(getEdit(editID))
  }, [snippetID, dispatch, JSON.stringify(allowedUsers)])

  if (snippet.loading || editReducer.loading) {
    return (
      <div className="h-full w-full">
        <div className="flex items-center justify-center h-full">
          <MoonLoader size={30} color="#000000" />
        </div>
      </div>
    )
  }

  console.log(editReducer.oneEdit)

  if (!snippet.oneSnippet || !editReducer.oneEdit) {
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <p>Snippet not found</p>
      </div>
    )
  }
  if (
    (!snippet.oneSnippet.publicSnippet && !isSignedIn) ||
    (isSignedIn && snippet.oneSnippet.userId !== user.id)
  ) {
    return (
      <div className="h-full w-full flex items-center justify-center flex-col gap-5">
        <ShieldAlert size={'40%'} color="maroon" />
        <p className="descriptionText">
          Previous Versions can only be seen by the owner
        </p>
      </div>
    )
  }
  const editDate = new Date(editReducer.oneEdit.date).toDateString()
  const restoreSnippet = {
    ...snippet.oneSnippet,
    ...editReducer.oneEdit.diff.previous,
  }
  console.log(restoreSnippet)
  return (
    <div className=" flex flex-col m-auto mt-16 font-inter-tight w-[80%] h-[80%] gap-10">
      <div className="flex justify-between max-lg:flex-col gap-4">
        <div className=" flex flex-col gap-3 max-lg:items-center">
          <h1 className=" font-bold tracking-wid max-md:text-lg text-2xl p-0 flex">
            {editReducer.oneEdit.diff.previous.name || snippet.oneSnippet.name}
          </h1>
          <div className="flex items-center">
            <div className="flex gap-3 items-center p-3 px-6 bg-gray-50 rounded-md">
              <img
                src={`${profilePicture}`}
                className="rounded-full h-8"
                alt="user"
              ></img>
              <span>{name}</span>
            </div>
          </div>
          <p className="text-gray-600 max-md:text-sm">
            {editReducer.oneEdit.diff.previous.description ||
              snippet.oneSnippet.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 max-lg:items-center ">
          {/*public or private snippet*/}
          {editReducer.oneEdit.diff.previous.publicSnippet ? (
            <div className="max-md:text-sm flex gap-5 items-center">
              <p>Public</p>
            </div>
          ) : snippet.oneSnippet.publicSnippet ? (
            <div className="max-md:text-sm flex gap-5 items-center">
              <p>Public</p>
            </div>
          ) : (
            <div className="max-md:text-sm flex gap-5 items-center">
              <p>Private</p>
            </div>
          )}

          <div className="mb-4 max-md:text-sm">
            <p>{editDate}</p>{' '}
          </div>
        </div>
      </div>
      <div className="w-full h-full self-center flex items-center justify-center">
        <AceEditor
          mode={
            editReducer.oneEdit.diff.previous.language ||
            snippet.oneSnippet.language
          }
          value={
            editReducer.oneEdit.diff.previous.code || snippet.oneSnippet.code
          }
          theme="github"
          width="80%"
          height="100%"
          readOnly
        />
      </div>
      <div>
        <RestoreVersionModal snippet={restoreSnippet} />
      </div>
    </div>
  )
}
export default Snippet
