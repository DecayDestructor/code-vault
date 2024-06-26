import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteSnippet } from '../../redux/slices/codeSnippet'
import DeleteModal from './DeleteModal'
import { Link } from 'react-router-dom'
const SnippetsList = ({ snippets }) => {
  const [localSnippets, setLocalSnippets] = useState(snippets)

  useEffect(() => {
    setLocalSnippets(snippets)
  }, [snippets])

  const handleDelete = (id) => {
    setLocalSnippets(
      localSnippets.filter((snippet) => snippet.snippetID !== id)
    )
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
          snippetID={snippet.snippetID}
          onDelete={() => {
            handleDelete(snippet.snippetID)
          }}
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
  snippetID,
  onDelete,
}) => {
  const dispatch = useDispatch()

  const handleDeleteClick = () => {
    onDelete(snippetID)
    dispatch(deleteSnippet(snippetID))
  }

  return (
    <div className="flex font-inter-tight justify-between px-10 bg-gray-50 p-7 h-full w-full rounded-lg shadow-md flex-wrap items-start hover:scale-[1.005] transition-transform duration-250 ease-soft-spring">
      <div className="flex flex-col justify-between gap-4 mb-4">
        <Link
          className="miniHeader md:text-xl max-md:text-medium font-bold tracking-wide"
          to={`/snippet/${snippetID}`}
        >
          {name}
        </Link>
        <p className="text-gray-600 max-md:text-sm">{description}</p>
      </div>
      <div className="max-md:text-sm">
        <p>{publicSnippet ? 'Public' : 'Private'}</p>
      </div>
      <div className="mb-4 max-md:text-sm">
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
