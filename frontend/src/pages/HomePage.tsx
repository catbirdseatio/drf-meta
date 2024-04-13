import { useState, useEffect } from "react";
import IndexService from "../services/IndexService";

const HomePage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
        const {message: apiMessage} = await IndexService.get();
       setMessage(apiMessage)
    })();
  }, []);

  return <div>{message}</div>;
};

export default HomePage;
