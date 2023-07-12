import * as React from "react"

type UserContextProps = {
  children: React.ReactNode;
}

interface MemoryContextInterface {
  cards: any[];  
  setCards: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
  numbersCardsFlipped: number;
  score: number;
  showCard: () => void;
  idsFlippedCards: any[];  
  idFoundPairsCards: any[];  
  startGame: () => void;
  resetGame: () => void;
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
}
 
// CREATE THE CONTEXT
const MemoryContext = React.createContext<MemoryContextInterface>(initialValue)

// CREATE THE PROVEDOR
export const MemoryContextProvider = ({ children }: UserContextProps) => {

  // ADD CONTEXT
  const [cards, setCards] = React.useState<any[]>([])  
  const [idsFlippedCards, setIdsFlippedCards] = React.useState<any[]>([])
  const [idFoundPairsCards, setIdFoundPairsCards] = React.useState<any[]>([])
 
  const [loading, setLoading] = React.useState(false)
  const [numbersCardsFlipped, setNumbersCardsFlipped] = React.useState(0)
  const [score, setScore] = React.useState(0)

  const startGame = () => {}

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
    resetGame
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
