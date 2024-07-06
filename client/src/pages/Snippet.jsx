import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneSnippet } from '../../redux/slices/codeSnippet'
import { MoonLoader } from 'react-spinners'
import AceEditor from 'react-ace'
import { ShieldAlert, Share2, Copy } from 'lucide-react'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'
import AddUserIdModal from '../Components/AddUserIdModal'
import RemoveUserIdModal from '../Components/RemoveUserIdModal'
import ShowUserIdModal from '../Components/ShowUserIdModal'
import { setAccess } from '../../redux/slices/userManagement'
import axios from 'axios'
const Snippet = () => {
  const { snippetID } = useParams()
  const snippet = useSelector((state) => state.snippetReducer)
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
  }, [snippetID, dispatch, JSON.stringify(allowedUsers)])

  const handleShareButtonClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Code Vault',
          text: `
          Check out this code snippet!
          Name: ${snippet.oneSnippet.name}
          Description:      ${snippet.oneSnippet.description}
          `,
          url: window.location.href,
        })
        .then(() => console.log('Link shared successfully'))
        .catch((error) => console.error('Error sharing the link', error))
    } else {
      toast.error('Web Share API is not supported in your browser.')
    }
  }
  if (snippet.loading) {
    return (
      <div className="h-full w-full">
        <div className="flex items-center justify-center h-full">
          <MoonLoader size={30} color="#000000" />
        </div>
      </div>
    )
  }

  if (!snippet.oneSnippet) {
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <p>Snippet not found</p>
      </div>
    )
  }
  if (
    (!snippet.oneSnippet.publicSnippet && !isSignedIn) ||
    (isSignedIn &&
      snippet.oneSnippet.userId !== user.id &&
      !snippet.oneSnippet.allowedUsers.includes(
        user.primaryEmailAddress.emailAddress
      ))
  ) {
    return (
      <div className="h-full w-full flex items-center justify-center flex-col gap-5">
        <ShieldAlert size={'40%'} color="maroon" />
        <p className="descriptionText">This snippet is private!</p>
      </div>
    )
  }

  return (
    <div className=" flex flex-col m-auto mt-16 font-inter-tight w-[80%] h-[80%] gap-10">
      <div className="flex justify-between max-lg:flex-col gap-4">
        <div className=" flex flex-col gap-3 max-lg:items-center">
          <h1 className=" font-bold tracking-wid max-md:text-lg text-2xl p-0 flex">
            {snippet.oneSnippet.name}
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
            {snippet.oneSnippet.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 max-lg:items-center ">
          {snippet.oneSnippet.publicSnippet ? (
            <div className="max-md:text-sm flex gap-5 items-center">
              <p>Public</p>
            </div>
          ) : snippet.oneSnippet.userId === user.id ? (
            <div className="max-md:text-sm flex gap-5 items-center">
              <p>Private</p>

              <AddUserIdModal snippetId={snippetID} />
              <RemoveUserIdModal snippetId={snippetID} />
              <ShowUserIdModal />
            </div>
          ) : (
            <div className="max-md:text-sm flex gap-5 items-center">
              <p>Private</p>
            </div>
          )}
          <div className="mb-4 max-md:text-sm">
            <p>{snippet.oneSnippet.date}</p>{' '}
          </div>
        </div>
      </div>
      <div className="w-full h-full self-center flex items-center justify-center">
        <AceEditor
          mode={snippet.oneSnippet.language}
          value={snippet.oneSnippet.code}
          theme="github"
          width="80%"
          height="100%"
          readOnly
        />
      </div>
      <div className="flex gap-6 items-center justify-center pb-10">
        <button
          className="rounded-full flex items-center justify-center"
          onClick={() => {
            handleShareButtonClick()
          }}
        >
          <Share2 className="" color="black" size={20} />
        </button>
        <button
          className="rounded-full flex items-center justify-center"
          onClick={() => {
            copyToClipboard(snippetID)
          }}
        >
          <Copy className="" color="black" size={20} />
        </button>
      </div>
    </div>
  )
}
const copyToClipboard = (id) => {
  navigator.clipboard.writeText(id).then(() => {
    toast.success('Snippet ID copied to clipboard!', { duration: 5000 })
  })
}
export default Snippet
