import * as React from "react"

type UserContextProps = {
  children: React.ReactNode;
}

interface MemoryContextInterface {
  data: string;
}

const initialValue = {
  data: ''
}
 
// CREATE THE CONTEXT
const MemoryContext = React.createContext<MemoryContextInterface>(initialValue)

// CREATE THE PROVEDOR
export const MemoryContextProvider = ({ children }: UserContextProps) => {
  // ADD CONTEXT
  const data = 'exemplo de context'

  const contextValue = {
    data,
  }

  return (
    <MemoryContext.Provider value={contextValue}>
      { children }
    </MemoryContext.Provider>
  )
}

export const useMemory = () => {
  return React.useContext(MemoryContext)
} 
