import Card from './Card'
import { useMemory } from '../contexts/MemoryContext'

const MemoryGame = () => {
  const { data } = useMemory()
  console.log(data)

  return (
    <div className="p-2">
      <h1>Memory Game</h1>

      <div className="grid grid-cols-4 gap-2">
        <Card />
      </div>
    </div>
  )
}

export default MemoryGame
