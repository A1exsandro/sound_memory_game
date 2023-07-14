import Card from './Card'
import { useMemory } from '../contexts/MemoryContext' 
import Players from './Players' 
import Header from './Header'

const MemoryGame = () => { 
  const { cards, loading, startGame } = useMemory()
 
  return (
    <div className="p-3">
      <h1>Memory Game</h1>

      <Players />

      <button
        className="bg-black text-white cursor-pointer px-4"
        onClick={startGame}
      >
        Start
      </button>

      <div className="grid grid-cols-4 gap-3">
        { 
          loading ? (
            <div className="fixed text-center font-bold w-full">
              <p className="">Wait please, loading the cards...</p>
            </div>
          ) : ( 
            cards.map((card, i) => (
              <Card key={i} {...card} />
            ))
          ) 
        }
      </div>
      
      <Header />
    </div>
  )
}

export default MemoryGame
