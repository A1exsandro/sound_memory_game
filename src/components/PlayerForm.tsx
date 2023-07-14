import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useMemory } from '../contexts/MemoryContext';
 
const PlayerForm: React.FC = () => {
  const [playerName, setPlayerName] = useState('')
  const { players, setPlayers } = useMemory()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value)
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (playerName.trim() !== '') {
      const newPlayer = {
        name: playerName, 
        score: 0
      };

      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);

      // clean the input
      setPlayerName('')
    }
  }

  return (
    <div className="">
      <form
        className="flex flex-col gap-3" 
        onSubmit={handleSubmit}
      >
        <label
          className="flex flex-col items-center gap-2"
        >
          Nome do jogador
          <input 
            className="rounded-xl pl-3"
            type="text" 
            value={playerName} 
            onChange={handleInputChange} 
          />
        </label> 

        <button 
          className="bg-gray-500 rounded-xl"
          type="submit"
        >
          Add Jogador
        </button> 

        <button 
          className="bg-gray-500 rounded-xl"
          onClick={() => setPlayers([])}
        >
          Remover Jogadores
        </button>
        
      </form>

      <div className="flex">
        {
          players.map((player, i) => (
            <div
              key={i} 
              className="ml-3"
            >
              {player.name}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PlayerForm
