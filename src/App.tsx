import MemoryGame from "./components/MemoryGame"

const App = () => { 

  return ( 
    <>
      <div className="bg-black text-white flex justify-center py-2">
        Sound Memory Game
      </div>
      
      <div className="">
        <MemoryGame />
      </div>
    </>
  )
}

export default App
