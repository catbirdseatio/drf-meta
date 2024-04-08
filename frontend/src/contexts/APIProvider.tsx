import React, { createContext, useContext } from "react";
import APIClient from "../APIClient";

// Define the type for your context value
interface APIContextType {
  api: APIClient;
}

// Create a context with the defined type
const APIContext = createContext<APIContextType | undefined>(undefined);

// Define the props for the provider
type ProviderProps = {
  children: React.ReactNode;
};

const APIProvider: React.FC<ProviderProps> = ({ children }) => {
  // Initialize your API client
  const api = new APIClient();

  return (
    <APIContext.Provider value={{ ...api }}>
      {children}
    </APIContext.Provider>
  );
};

// Create a hook to consume the context
export const useAPI = (): APIContextType => {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("useAPI must be used within an APIProvider");
  }
  return context;
};

export default APIProvider;
