import * as React from "react"
import { useFetch } from "../hooks/useFetch";

type UserContextProps = {
  children: React.ReactNode;
}

interface Card {
  id?: number;
  idBoth: number;
  imageName: string;
  imageUrl: string;
  soundUrl: string;
}

interface MemoryContextInterface { 
  cards: Card[];  
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  loading: boolean;
  numbersCardsFlipped: number;
  score: number;
  showCard: () => void;
  idsFlippedCards: any[];  
  idFoundPairsCards: any[];  
  startGame: () => void;
  resetGame: () => void;
  gameLevel: number;
  setGameLevel: React.Dispatch<React.SetStateAction<number>>;
}

const initialValue: MemoryContextInterface = { 
  cards: [],
  setCards: () => {},
  loading: false,
  numbersCardsFlipped: 0,
  score: 0,
  showCard: () => {},
  idsFlippedCards: [],
  idFoundPairsCards: [],
  startGame: () => {},
  resetGame: () => {},
  gameLevel: 4,
  setGameLevel: () => {}
}
 
// CREATE THE CONTEXT
const MemoryContext = React.createContext<MemoryContextInterface>(initialValue)

// CREATE THE PROVEDOR
export const MemoryContextProvider = ({ children }: UserContextProps) => {
  // ADD CONTEXT
  const { shuffledCards } = useFetch() 
  const [cards, setCards] = React.useState<Card[]>(initialValue.cards)  
  const [idsFlippedCards, setIdsFlippedCards] = React.useState<any[]>([])
  const [idFoundPairsCards, setIdFoundPairsCards] = React.useState<any[]>([])
 
  const [loading, setLoading] = React.useState(false)
  const [numbersCardsFlipped, setNumbersCardsFlipped] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [gameLevel,setGameLevel] = React.useState(initialValue.gameLevel)

  const startGame = () => {
    setLoading(true)  
    setCards(shuffledCards)
    setLoading(false)
  }

  const resetGame = () => {}

  const showCard = () => {}

  const contextValue: MemoryContextInterface = {
    cards,
    setCards,
    loading,
    numbersCardsFlipped,
    score,
    showCard,
    idsFlippedCards,
    idFoundPairsCards,
    startGame,
    resetGame,
    gameLevel,
    setGameLevel
  }

  return (
    <MemoryContext.Provider value={contextValue}>
      { children }
    </MemoryContext.Provider>
  )
}

export const useMemory = () => {
  return React.useContext(MemoryContext)
} 
