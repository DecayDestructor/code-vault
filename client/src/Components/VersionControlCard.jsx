import { Link } from 'react-router-dom'

const VersionControlCard = (props) => {
  const { name, editMessage, editName, snippetID, date } = props || ''
  const editDate = new Date(date)
  console.log(editDate)
  // console.log(name, editMessage, editName)
  return (
    <div className="mr-6">
      <div className="bg-gray-100 pb-7 px-4 pt-3 mb-4 rounded-sm flex flex-wrap justify-between">
        <div className="flex flex-col gap-3">
          <Link
            className="miniHeader md:text-xl max-md:text-medium font-bold tracking-wide"
            to={`/snippet/${snippetID}`}
          >
            {editName}
          </Link>
          <div>
            <p className="text-gray-600 max-md:text-sm">{editMessage}</p>
          </div>
        </div>
        <div className="mb-4 max-md:text-sm">
          <p>{editDate.toDateString()}</p>{' '}
        </div>
      </div>
      <hr />
    </div>
  )
}
export default VersionControlCard
