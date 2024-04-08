import React, { createContext, useContext, useState } from "react";

// Define the type for your flash message
interface FlashMessage {
  message: string;
  type: string;
}

// Define the type for your context value
interface FlashContextType {
  flash: (message: string, type: string, duration?: number) => void;
  hideFlash: () => void;
  flashMessage: FlashMessage;
  visible: boolean;
}

// Create a context with the defined type
export const FlashContext = createContext<FlashContextType | undefined>(undefined);

let flashTimer: ReturnType<typeof setTimeout> | undefined;

const FlashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage>({ message: "", type: "" });
  const [visible, setVisible] = useState(false);

  const flash = (message: string, type: string, duration = 10) => {
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

export const useFlash = (): ((message: string, type: string, duration?: number) => void) => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error("useFlash must be used within a FlashProvider");
  }
  return context.flash;
};
