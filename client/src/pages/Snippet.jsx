import { useEffect } from 'react'
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
const Snippet = () => {
  const { snippetID } = useParams()
  const snippet = useSelector((state) => state.snippet)
  const dispatch = useDispatch()
  const { user, isSignedIn } = useUser()
  useEffect(() => {
    dispatch(getOneSnippet(snippetID))
  }, [snippetID, dispatch])

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
    (isSignedIn && snippet.oneSnippet.userId !== user.id)
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
          <p className="text-gray-600 max-md:text-sm">
            {snippet.oneSnippet.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 max-lg:items-center ">
          <div className="max-md:text-sm ">
            <p>{snippet.oneSnippet.publicSnippet ? 'Public' : 'Private'}</p>
          </div>
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
