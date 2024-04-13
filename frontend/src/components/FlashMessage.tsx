import {  useFlash } from '../contexts/FlashContext'

const FlashMessage = () => {
  const { flashMessage, visible, hideFlash } = useFlash();
  return (
   visible && <div>
    <div className={`alert alert-${flashMessage.type || 'info'}`}>
        <button onClick={hideFlash}>x</button>
        <span>{flashMessage.message}</span>
    </div>
   </div>
  )
}

export default FlashMessage