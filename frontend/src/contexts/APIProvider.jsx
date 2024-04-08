import { createContext, useContext } from "react";
import APIClient from "../APIClient";

const APIContext = createContext();


// eslint-disable-next-line react/prop-types
const APIProvider = ({ children }) => {
    const api = new APIClient();

    return (<APIContext.Provider value={api}>
        { children }
    </APIContext.Provider> )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAPI = () => useContext(APIContext);

export default APIProvider;