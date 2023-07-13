import { useRef, MutableRefObject, useState } from 'react'
import { Tilt } from 'react-tilt';

interface Card {
  id?: number;
  idBoth: number;
  imageName: string;
  imageUrl: string;
  soundUrl: string;
}

const Card = ({ id, idBoth, imageName, imageUrl, soundUrl }: Card) => {
  const [flipped, setFlipped] = useState(true)
  const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef(null) 

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  } 

  const handleClick = () => { 
    playAudio()
    setFlipped(!flipped)
  }  
  console.log(id)
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
        ${flipped ? '' : 'rotateY'}`}
        onClick={() => handleClick()}
      >
        <audio ref={audioRef}>
          <source src={soundUrl} /> 
        </audio>
          
        {/* FRONT OF CARD */}
        <div 
          className="flex justify-center items-center flip rotateY rounded-xl
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          <img 
            className="w-full h-full rounded-xl"
            src={imageUrl} 
            alt={imageName}
          /> 
        </div>

        {/* BACK OF CARD */}
        <div className="flex justify-center items-center bg-red-400 flip backface-none rounded-xl"
        >
          
        </div>
      </div>
    </Tilt>
  )
}

export default Card 
