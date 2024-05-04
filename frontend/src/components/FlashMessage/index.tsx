import { useFlash } from "../../contexts/FlashContext";
import { LuInfo as Info } from "react-icons/lu";

import { LuX as ButtonIcon } from "react-icons/lu";



const FlashMessage = () => {
  const { flashMessage, visible, hideFlash } = useFlash();
  return (
    visible && (
      <div role="alert">
        <Info />
  <span >Info</span>
  <div >{flashMessage.message}</div>
    <button type="button" id="alert-1"  data-dismiss-target="#alert-1" aria-label="Close"
    onClick={hideFlash}
    >
      <span >Close</span>
      <ButtonIcon size={48}/>
  </button>
</div>
    )
  );
};

export default FlashMessage;
