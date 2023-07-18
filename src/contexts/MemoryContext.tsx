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
  score: number
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
  // resetGame: () => void;
  gameLevel: number;
  setGameLevel: React.Dispatch<React.SetStateAction<number>>;
  players: PlayersProps[]; 
  setPlayers: React.Dispatch<React.SetStateAction<PlayersProps[]>>;
  currentPlayerIndex: number | null;
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
  // resetGame: () => {},
  gameLevel: 26,
  setGameLevel: () => {},
  players: [{
    name: 'Score',
    score: 0
  }], 
  setPlayers: () => {},
  currentPlayerIndex: 0
}
 
// CREATE THE CONTEXT
const MemoryContext = React.createContext<MemoryContextInterface>(initialValue)

// CREATE THE PROVEDOR
export const MemoryContextProvider = ({ children }: UserContextProps) => {
  // ADD CONTEXT
  const { shuffledCards } = useFetch() 
  const [loading, setLoading] = React.useState(false)
  const [gameLevel,setGameLevel] = React.useState<number>(initialValue.gameLevel)

  const [cards, setCards] = React.useState<Card[]>([])  
  const [idsFlippedCards, setIdsFlippedCards] = React.useState<number[]>([])
  const [idFoundPairsCards, setIdFoundPairsCards] = React.useState<number[]>([])
 
  
  const [numbersCardsFlipped, setNumbersCardsFlipped] = React.useState(0) 
  

  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0)
  const [players, setPlayers] = React.useState<PlayersProps[]>(initialValue.players)


  // React.useEffect(() => {
  //   setCards(shuffledCards)
  // },[gameLevel])

  const startGame = () => {
    setLoading(true)  
    setCards(shuffledCards)
    setLoading(false)
  }

  const resetGame = () => { 
    setIdsFlippedCards([])
    setIdFoundPairsCards([])
    setNumbersCardsFlipped(0)
    setPlayers(initialValue.players) 
  }

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
    // resetGame,
    gameLevel,
    setGameLevel,
    players,
    setPlayers,
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
