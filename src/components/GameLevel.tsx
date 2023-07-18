import { useMemory } from "../contexts/MemoryContext"

const GameLevel = () => {
  const { gameLevel, setGameLevel } = useMemory()

  return (
    <div className="">
      <div
        onClick={() => setGameLevel(8)} 
        className="bg-gray-500 my-3 px-3 rounded-xl cursor-pointer"
      >
        {gameLevel}
      </div>
    </div>
  )
}

export default GameLevel
