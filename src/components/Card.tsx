import { useRef, MutableRefObject, useEffect } from 'react'
import { Tilt } from 'react-tilt'
import { useMemory } from '../contexts/MemoryContext'

interface Card {
  id: number;
  idBoth: number;
  imageName: string;
  imageUrl: string;
  soundUrl: string;
}

const Card = ({ id, idBoth, imageName, imageUrl, soundUrl }: Card) => {
  const { idsFlippedCards, idFoundPairsCards, showCard } = useMemory()
  const flipped = idsFlippedCards.includes(id) || idFoundPairsCards.includes(idBoth)
  const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef(null)
 
  useEffect(() => {
    const audioElement = new Audio(soundUrl)
    audioRef.current = audioElement
  },[soundUrl])

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  } 

  const handleClick = () => { 
    playAudio() 
    showCard({ id, idBoth })
  }   

  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450
      }}
    >
      <div 
        className={`aspect-[3/4] w-[78px] sm:w-[88px] 2xl:w-40 card-container rounded-xl
        ${flipped ? 'rotateY' : ''}`}
        onClick={() => handleClick()}
      >
        <audio>
          <source src={soundUrl} /> 
        </audio>
          
        {/* FRONT OF CARD */}
        <div 
          className={`flex justify-center items-center flip rotateY rounded-xl
          ${id !== idBoth && 'border-solid border-2 border-indigo-600'}`}
        > 
          {
            id === idBoth ? (
              <img 
                className="w-full h-full rounded-xl"
                src={imageUrl} 
                alt={imageName}
              /> 
            ) : (
              <div 
                className={`font-bold ${imageName.length > 10 && '-rotate-45'}`}
              >
                {imageName}
              </div>
            )
          }
        </div>

        {/* BACK OF CARD */}
        <div 
          className="flex justify-center items-center flip backface-none rounded-xl
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />  
      </div>
    </Tilt>
  )
}

export default Card 
