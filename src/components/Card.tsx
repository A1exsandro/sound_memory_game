import { useState } from 'react'

const Card = () => {
  const [flipped, setFlipped] = useState(true)

  const handleClick = () => { 
    setFlipped(!flipped)
  } 

  return (
    <div className="">
      <div 
        onClick={() => handleClick()}
        className={`aspect-[3/4] card-container rounded-xl 
        ${flipped ? '' : 'rotateY'}`}
      >
        {/* FRONT OF CARD */}
        <div 
          className="flex justify-center items-center flip rotateY rounded-xl
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        > 
          Front
        </div>

        {/* BACK OF CARD */}
        <div 
          className="flex justify-center items-center bg-red-400 flip 
          backface-none rounded-xl"
        >
          Back
        </div>

      </div>
    </div>
  )
}

export default Card 
