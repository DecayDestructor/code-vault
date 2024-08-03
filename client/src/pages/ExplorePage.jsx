import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ExplorePage = () => {
  const { searchParam } = useParams()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParam])

  console.log(searchQuery)

  return (
    <div className="h-full w-full flex flex-col mt-5 px-4 gap-5 items-center">
      <div className="flex flex-col w-[60%] gap-4 items-center font-inter-tight">
        <form className="w-full">
          <input
            type="text"
            className="border-2 border-gray-300 p-2 w-full rounded-xl focus:outline-none"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default ExplorePage
