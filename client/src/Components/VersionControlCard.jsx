import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteEdit } from '../../redux/slices/versionControl'
import DeleteModal from './DeleteModal'

const VersionControlCard = (props) => {
  const { name, editMessage, editName, snippetID, date, editID } = props || ''
  const dispatch = useDispatch()
  const editDate = new Date(date)
  // console.log(name, editMessage, editName)
  console.log('rendering version control card')
  const handleDeleteClick = (editID) => {
    dispatch(deleteEdit(editID))
  }
  return (
    <div className="mr-6">
      <div className="bg-gray-100 pb-7 px-8 pt-5 mb-4 rounded-sm flex flex-wrap justify-between items-start">
        <div className="flex flex-col gap-3">
          <Link
            className="miniHeader md:text-xl max-md:text-medium font-bold tracking-wide"
            to={`/snippet/${snippetID}/version/${editID}`}
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
        <DeleteModal
          handleDelete={() => {
            handleDeleteClick(editID)
          }}
        />
      </div>
      <hr />
    </div>
  )
}
export default VersionControlCard
