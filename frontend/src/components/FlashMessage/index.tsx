import { useFlash } from "../../contexts/FlashContext";
import { LuInfo as Info } from "react-icons/lu";

import { LuX as ButtonIcon } from "react-icons/lu";



const FlashMessage = () => {
  const { flashMessage, visible, hideFlash } = useFlash();
  return (
    visible && (
      <div className={`flex col-span-12  h-[3.75rem] alert-${flashMessage.type} items-center p-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400`} role="alert">
        <Info />
  <span >Info</span>
  <div >{flashMessage.message}</div>
    <button type="button" id="alert-1"  data-dismiss-target="#alert-1" aria-label="Close"
    onClick={hideFlash}
    >
      <span className="sr-only">Close</span>
      <ButtonIcon size={48}/>
  </button>
</div>
    )
  );
};

export default FlashMessage;
