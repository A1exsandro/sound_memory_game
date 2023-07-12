import MemoryGame from "./components/MemoryGame"
import { MemoryContextProvider } from "./contexts/MemoryContext"

const App = () => { 

  return ( 
    <>
      <div className="bg-black text-white flex justify-center py-2">
        Sound Memory Game
      </div>
      
      <div className="">
        <MemoryContextProvider>
          <MemoryGame />
        </MemoryContextProvider>
      </div>
    </>
  )
}

export default App
