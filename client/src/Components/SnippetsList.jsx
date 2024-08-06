import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteSnippet } from '../../redux/slices/codeSnippet'
import DeleteModal from './DeleteModal'
import { Link, useNavigate } from 'react-router-dom'
import { Edit, HistoryIcon } from 'lucide-react'
import { Tooltip } from '@nextui-org/react'
import { deleteALl } from '../../redux/slices/versionControl'

const SnippetsList = ({ snippets, name, categories }) => {
  const [localSnippets, setLocalSnippets] = useState(() => {
    return snippets.filter((snippet) => {
      const nameMatch =
        name.trim() === '' ||
        snippet.name.toLowerCase().includes(name.toLowerCase().trim())
      const categoryMatch =
        categories.length === 0 ||
        categories.every((category) => {
          console.log(category)
          return snippet.categories.includes(category) && category != ','
        })
      return nameMatch && categoryMatch
    })
  })

  useEffect(() => {
    setLocalSnippets(
      snippets.filter((snippet) => {
        const nameMatch =
          name?.trim() === '' ||
          snippet.name.toLowerCase().includes(name?.toLowerCase().trim())
        const categoryMatch =
          categories?.length === 0 ||
          categories?.every((category) => {
            return snippet.categories.includes(category) && category != ','
          })
        return nameMatch && categoryMatch
      })
    )
  }, [snippets, name, JSON.stringify(categories)])

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
  const navigate = useNavigate()
  const handleDeleteClick = () => {
    onDelete(snippetID)
    dispatch(deleteSnippet(snippetID))
    dispatch(deleteALl(snippetID))
  }
  // console.log(new Date(Date.parse(date)).toDateString())
  const dateString = new Date(Date.parse(date)).toDateString()
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
        <p>{dateString}</p>{' '}
      </div>
      <div className="flex gap-5 justify-between items-center">
        <DeleteModal handleDelete={handleDeleteClick} />
        <Tooltip content="Edit Snippet">
          <button
            onClick={() => {
              navigate(`/edit-snippet/${snippetID}`)
            }}
          >
            <Edit size={18} />
          </button>
        </Tooltip>
        <Tooltip content="View History">
          <button
            onClick={() => {
              navigate(`/snippet/${snippetID}/history`)
            }}
          >
            <HistoryIcon size={18} />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default SnippetsList
