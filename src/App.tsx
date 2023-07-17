import MemoryGame from "./components/MemoryGame"
import { MemoryContextProvider } from "./contexts/MemoryContext"

const App = () => { 

  return (  
    <div className="h-full">
      <MemoryContextProvider>
        <MemoryGame />
      </MemoryContextProvider>
    </div> 
  )
}

export default App
