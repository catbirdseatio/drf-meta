import { useState, useEffect } from "react"
import { useAPI} from "../contexts/APIProvider"
const HomePage = () => {
  const [message, setMessage] = useState("")
  const api = useAPI()

    useEffect(() => {
      (async () => {
        try {
            const response = await api.get("/");
            setMessage(response.data.message)
        } catch(error) {
            console.log(error)
        }
        
      })()
    }, [api])
    

  return (
    <div>{message}</div>
  )
}

export default HomePage