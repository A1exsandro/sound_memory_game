import Card from './Card';

const MemoryGame = () => {
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
