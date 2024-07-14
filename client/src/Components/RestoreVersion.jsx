import { Tooltip } from '@nextui-org/react'
import { ListRestart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { restoreVersion } from '../../redux/slices/codeSnippet'

const RestoreVersion = ({ snippet }) => {
  const dispatch = useDispatch()
  return <div className="flex items-center justify-center pb-5"></div>
}
export default RestoreVersion
