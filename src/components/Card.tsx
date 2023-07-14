import { useRef, MutableRefObject } from 'react'
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

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  } 

  const handleClick = () => { 
    playAudio() 
    showCard({ id, idBoth })
  }  
  // console.log(id)
  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450
      }}
    >
      <div 
        className={`aspect-[3/4] card-container rounded-xl
        ${flipped ? 'rotateY' : ''}`}
        onClick={() => handleClick()}
      >
        <audio ref={audioRef}>
          <source src={soundUrl} /> 
        </audio>
          
        {/* FRONT OF CARD */}
        <div 
          className="flex justify-center items-center flip rotateY rounded-xl"
        > 
          <img 
            className="w-full h-full rounded-xl"
            src={imageUrl} 
            alt={imageName}
          />
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
