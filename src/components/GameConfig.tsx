import { useState } from "react"
import PlayerForm from "./PlayerForm"
import GameLevel from "./GameLevel"

const GameConfig = () => {
  const [showConfig, setShowConfig] = useState(false)

  const handleShowConfig = () => {
    setShowConfig(!showConfig)
  }
  return (
    <div className="flex flex-col items-center py-3">
      <div
        onClick={handleShowConfig} 
        className="cursor-pointer"
      >
        Config
      </div>

      <div className={`${showConfig ? 'flex' : 'hidden'}`}>
        <PlayerForm />
      </div>

      <GameLevel />
    </div>
  )
}

export default GameConfig
