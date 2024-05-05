import { FaXmark as Icon } from "react-icons/fa6";
import { useFlash } from '../../contexts/FlashContext'

import "./FlashMessage.css"

const FlashMessage = () => {
  const { flashMessage, visible, hideFlash } = useFlash();
  return (
    visible &&
    <div className={`alert alert-${flashMessage.type || 'info'}`} role='alert'>
      <span>{flashMessage.message}</span>
      <button onClick={hideFlash}><Icon size={32} /></button>
    </div>
  )
}

export default FlashMessage