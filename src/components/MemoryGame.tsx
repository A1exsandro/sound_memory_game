import Card from './Card'
import { useMemory } from '../contexts/MemoryContext' 

const MemoryGame = () => { 
  const { cards, startGame } = useMemory()

  return (
    <div className="p-3">
      <h1>Memory Game</h1>
      <button
        className="bg-black text-white cursor-pointer px-4"
        onClick={startGame}
      >
        Start
      </button>

      <div className="grid grid-cols-4 gap-3">
        {
          cards.map((card, i) => (
            <Card key={i} {...card}/>
          ))
        }
      </div>
    </div>
  )
}

export default MemoryGame
