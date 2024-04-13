import React, { createContext, useContext, useState } from "react";
import { FlashContextType, IFlashMessage } from "../@types/flash";

// Create a context with the defined type
export const FlashContext = createContext<FlashContextType | undefined>(
  undefined
);

let flashTimer: ReturnType<typeof setTimeout> | undefined;

const FlashProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [flashMessage, setFlashMessage] = useState<IFlashMessage>({
    message: "",
    type: "",
  });
  const [visible, setVisible] = useState(false);

  const flash = (message: string, type: string = "info", duration = 10) => {
    if (flashTimer) {
      clearTimeout(flashTimer);
      flashTimer = undefined;
    }
    setFlashMessage({ message, type });
    setVisible(true);
    if (duration) flashTimer = setTimeout(hideFlash, duration * 1000);
  };

  const hideFlash = () => setVisible(false);

  return (
    <FlashContext.Provider value={{ flash, hideFlash, flashMessage, visible }}>
      {children}
    </FlashContext.Provider>
  );
};

export default FlashProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useFlash = () => {
  const context = useContext(FlashContext);
  if (context === undefined) {
    throw new Error("useFlash must be used within a FlashProvider");
  }
  return context;
};
