import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TrashIcon } from 'lucide-react'
import { deleteSnippet } from '../../redux/slices/codeSnippet'
import DeleteModal from './DeleteModal'

const SnippetsList = ({ snippets }) => {
  const [localSnippets, setLocalSnippets] = useState(snippets)

  useEffect(() => {
    setLocalSnippets(snippets)
  }, [snippets])

  const handleDelete = (id) => {
    setLocalSnippets(localSnippets.filter((snippet) => snippet._id !== id))
  }

  return (
    <div className="flex flex-col gap-7">
      {localSnippets.map((snippet) => (
        <SnippetCard
          key={snippet.snippetID}
          name={snippet.name}
          description={snippet.description}
          url={snippet.url}
          date={snippet.date}
          publicSnippet={snippet.publicSnippet}
          _id={snippet._id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

const SnippetCard = ({
  name,
  description,
  date,
  publicSnippet,
  _id,
  onDelete,
}) => {
  const dispatch = useDispatch()

  const handleDeleteClick = () => {
    onDelete(_id)
    dispatch(deleteSnippet(_id))
  }

  return (
    <div className="flex justify-between px-10 bg-gray-50 p-7 h-full w-full rounded-lg shadow-md flex-wrap items-start cursor-pointer hover:scale-105 transition-transform duration-250 ease-soft-spring">
      <div className="flex flex-col justify-between w-3/6 gap-4 mb-4">
        <h1 className="font-inter-tight miniHeader md:text-xl max-md:text-medium font-bold tracking-wide">
          {name}
        </h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="w-1/4">
        <p>{publicSnippet ? 'Public' : 'Private'}</p>
      </div>
      <div className="mb-4">
        <p>{date}</p>{' '}
      </div>
      {/* <button
        className="grow flex items-center justify-center"
        onClick={handleDeleteClick}
      >
        <TrashIcon />
      </button> */}
      <DeleteModal handleDelete={handleDeleteClick} />
    </div>
  )
}

export default SnippetsList
