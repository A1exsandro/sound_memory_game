import Card from './Card'
import { useMemory } from '../contexts/MemoryContext' 
import Players from './Players' 
import Header from './Header'

const MemoryGame = () => { 
  const { cards, loading } = useMemory()
 
  return (
    <div className="flex flex-col items-center p-3">
      <h1>Memory Game</h1>

      <Players /> 

      <div className="flex justify-center flex-wrap gap-3 mt-2">
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
