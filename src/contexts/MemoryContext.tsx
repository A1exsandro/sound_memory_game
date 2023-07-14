import * as React from "react"
import { useFetch } from "../hooks/useFetch"
import { TEMPO_MS } from "../constants/config"

type UserContextProps = {
  children: React.ReactNode;
}

interface Card {
  id: number;
  idBoth: number;
  imageName: string;
  imageUrl: string;
  soundUrl: string;
}

interface PlayersProps {
  name: string,
  score: number,
  current: boolean
}

interface MemoryContextInterface { 
  cards: Card[];  
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  loading: boolean;
  numbersCardsFlipped: number; 
  showCard: ({id, idBoth}: {id:number, idBoth: number}) => void;
  idsFlippedCards: number[];  
  idFoundPairsCards: number[];  
  startGame: () => void;
  resetGame: () => void;
  gameLevel: number;
  setGameLevel: React.Dispatch<React.SetStateAction<number>>;
  players: PlayersProps[]; 
  currentPlayerIndex: number;
}

const initialValue: MemoryContextInterface = { 
  cards: [],
  setCards: () => {},
  loading: false,
  numbersCardsFlipped: 0, 
  showCard: () => {},
  idsFlippedCards: [],
  idFoundPairsCards: [],
  startGame: () => {},
  resetGame: () => {},
  gameLevel: 4,
  setGameLevel: () => {},
  players: [], 
  currentPlayerIndex: 0
}
 
// CREATE THE CONTEXT
const MemoryContext = React.createContext<MemoryContextInterface>(initialValue)

// CREATE THE PROVEDOR
export const MemoryContextProvider = ({ children }: UserContextProps) => {
  // ADD CONTEXT
  const { shuffledCards } = useFetch() 
  const [loading, setLoading] = React.useState(false)

  const [cards, setCards] = React.useState<Card[]>(initialValue.cards)  
  const [idsFlippedCards, setIdsFlippedCards] = React.useState<number[]>([])
  const [idFoundPairsCards, setIdFoundPairsCards] = React.useState<number[]>([])
 
  
  const [numbersCardsFlipped, setNumbersCardsFlipped] = React.useState(0) 
  const [gameLevel,setGameLevel] = React.useState(initialValue.gameLevel)

  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0)
  const [players, setPlayers] = React.useState([
    {
      name: 'Alexsandro ',
      score: 0,
      current: true
    },
    {
      name: 'Adriana ',
      score: 0,
      current: false
    },
    {
      name: 'Kemilly ',
      score: 0,
      current: false
    },
    {
      name: 'Alexia ',
      score: 0,
      current: false
    }
  ])


  const startGame = () => {
    setLoading(true)  
    setCards(shuffledCards)
    setLoading(false)
  }

  const resetGame = () => {}

  // INCREMENT A VALUE WHEN THE CARD IS FLIPPED
  const numberOfTimesFlipped = () => {
    setNumbersCardsFlipped((amount) => amount + 1)
  }

  // CHECK CARDS
  const checkCards = ([id1, id2]: number[]) => {
    const idPair1 = cards.find(({ id }) => id === id1)?.idBoth
    const idPair2 = cards.find(({ id }) => id === id2)?.idBoth
    return idPair1 === idPair2
  }

  // SHOW CARD
  const showCard = ({ id, idBoth }: {id:number, idBoth: number}) => {
    const isCardFlipped = idsFlippedCards.includes(id) || idFoundPairsCards.includes(idBoth)
    if (isCardFlipped) return

    numberOfTimesFlipped()

    if (idsFlippedCards.length >= 2) {
      return setIdsFlippedCards([])
    }
    if (idsFlippedCards.length === 0) {
      return setIdsFlippedCards([id])
    }

    const ids: number[] = [idsFlippedCards[0], id]
    setIdsFlippedCards(ids)

    // CHECK CARDS
    const sameCards = checkCards(ids)
    if (sameCards) {
      
      setPlayers((prev: PlayersProps[]) => {
        const prevPlayers = [...prev]
        prevPlayers[currentPlayerIndex] = {
          ...prev[currentPlayerIndex],
          score: prev[currentPlayerIndex].score + 1
        }
        return prevPlayers
      })
      setIdFoundPairsCards((ids) => [...ids, idBoth])
      
    } else {
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex( current => current + 1)
      } else {
        setCurrentPlayerIndex(0)
      }
    }

    const time = sameCards ? 0 : TEMPO_MS.FLIP_CARDS

    setTimeout(() => {
      setIdsFlippedCards([])
    }, time)
  }

  const contextValue: MemoryContextInterface = {
    cards,
    setCards,
    loading,
    numbersCardsFlipped, 
    showCard,
    idsFlippedCards,
    idFoundPairsCards,
    startGame,
    resetGame,
    gameLevel,
    setGameLevel,
    players,
    currentPlayerIndex, 
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
