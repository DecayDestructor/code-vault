import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneSnippet } from '../../redux/slices/codeSnippet'
import { MoonLoader } from 'react-spinners'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

const Snippet = () => {
  const { snippetID } = useParams()
  const snippet = useSelector((state) => state.snippet)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneSnippet(snippetID))
  }, [snippetID, dispatch])

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
      <div className="h-full w-full flex items-center justify-center">
        <p>Snippet not found</p>
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
          height="80%"
          readOnly
        />
      </div>
    </div>
  )
}

export default Snippet
