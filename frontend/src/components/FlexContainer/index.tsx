import { ReactNode } from "react"

import styles from "./FlexContainer.module.css";

type FlexContainerProps = {
    children: ReactNode
}

const FlexContainer = ({children}: FlexContainerProps) => {
  return (
   <div className={styles.container}>
    {children}
   </div>
  )
}

export default FlexContainer