import { useContext } from "react";
import { FlashContext } from "../contexts/FlashProvider";

const FlashMessage = () => {
  const { flashMessage, visible, hideFlash } = useContext(FlashContext);

  return (
    visible && (
      <div>
        <div className={`alert alert${flashMessage.type || 'info'}`}>
          <button onClick={hideFlash}>X</button>
          <span>{flashMessage.message}</span>
        </div>
      </div>
    )
  );
};

export default FlashMessage;
