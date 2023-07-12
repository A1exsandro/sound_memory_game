import Card from './Card'
import { useMemory } from '../contexts/MemoryContext'

const MemoryGame = () => {
  const { cards } = useMemory(); console.log(cards)

  return (
    <div className="p-2">
      <h1>Memory Game</h1>

      <div className="grid grid-cols-4 gap-2">
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
