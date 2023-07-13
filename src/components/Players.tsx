import { useMemory } from "../contexts/MemoryContext"

const Players = () => {
  const { players, currentPlayerIndex } = useMemory() 

	return (
		<div
      className="flex justify-around items-center bg-slate-700 text-white w-full"
    >
      {
        players.map((player, i) =>  
          <div
            className={`${players[currentPlayerIndex].name === player.name && 
              'text-green-500'}`} 
            key={i} 
          >
            {player.name} : {player.score} 
          </div>
        )
      }
    </div>
	)
}

export default Players
