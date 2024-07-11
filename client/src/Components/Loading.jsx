import { MoonLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MoonLoader color="#000000" loading size={30} />
    </div>
  )
}
export default Loading
