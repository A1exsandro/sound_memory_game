import { useEffect, useState } from "react" 

import { getStorage } from '../services/Firebase'
import { ref, getDownloadURL } from "firebase/storage" 
import { cardNames } from "../constants/cards"
import { useMemory } from "../contexts/MemoryContext";

interface Card {
  id: number;
  idBoth: number;
  imageName: string;
  imageUrl: string;
  soundUrl: string;
}
 
const storage = getStorage()
const data = cardNames

export const useFetch = () => {
  const { gameLevel } = useMemory()
  const [images, setImages] = useState<string[]>([])
  const [sounds, setSounds] = useState<string[]>([])
  const makedCards = []

  // GET DATA FROM FIREBASE
  useEffect(() => {
    const promises = data.map((dt) => (
      getDownloadURL(ref(storage, `images/${dt}.jpeg`))
    ))
    const audioPromises = data.map((dt) => (
      getDownloadURL(ref(storage, `audio/${dt}.mp3`))
    ))

    Promise.all(promises)
      .then((urls) => setImages(urls)) 
      .catch((error) => {
        console.log(error)
      });

    Promise.all(audioPromises)
      .then((audios) => setSounds(audios)) 
      .catch((error) => {
        console.log(error)
      });
  },[])

  // CREATING AN OBJECT THROUGH ARRAY INTERACTION
  for (let i = 0; i < data.length && i < gameLevel; i++) {
    makedCards[i] = {
      idBoth: i,  
      imageName: data[i],
      imageUrl: images[i],
      soundUrl: sounds[i],
    }
  }   

  // DUPLICATING THE CARDS
  const pairsOfCards = [ ...makedCards, ...makedCards ].map((card, id) => ({
    id, ...card
  }))

  // SHUFFLER THE CARDS
  const shuffleCards = (list: Card[]): Card[] => {
    for (let i = list.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
  
      const item = list[i]
      const randomItem = list[randomIndex]
  
      list[i] = randomItem
      list[randomIndex] = item
    }
  
    return list
  }

  const shuffledCards: Card[] = shuffleCards(pairsOfCards)

  return { images, sounds, makedCards, pairsOfCards, shuffledCards}
}
