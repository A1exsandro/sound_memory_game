import { useEffect, useState } from "react"
import { useMemory } from "../contexts/MemoryContext"

interface ApiCard {
  name: string
  imageUrl: string
  soundUrl: string
}

interface Card {
  id: number
  idBoth: number
  imageName: string
  imageUrl: string
  soundUrl: string
}

export const useFetch = () => {
  const { gameLevel } = useMemory()

  const [cardsFromApi, setCardsFromApi] = useState<ApiCard[]>([])
  const [loading, setLoading] = useState(true)

  const baseUrl = import.meta.env.VITE_BASE_URL
  
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(baseUrl)
        const data = await response.json()
        setCardsFromApi(data)
      } catch (error) {
        console.error("Erro ao buscar assets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  // Mantém compatibilidade
  const images = cardsFromApi.map(c => c.imageUrl)
  const sounds = cardsFromApi.map(c => c.soundUrl)

  const limitedCards = cardsFromApi.slice(0, gameLevel)

  const makedCards = limitedCards.map((card, index) => ({
    idBoth: index,
    imageName: card.name,
    imageUrl: card.imageUrl,
    soundUrl: card.soundUrl,
  }))

  const pairsOfCards = [...makedCards, ...makedCards].map((card, id) => ({
    id,
    ...card,
  }))

  const shuffleCards = (list: Card[]): Card[] => {
    for (let i = list.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[list[i], list[randomIndex]] = [list[randomIndex], list[i]]
    }
    return list
  }

  const shuffledCards = shuffleCards(pairsOfCards)

  return {
    images,
    sounds,
    makedCards,
    pairsOfCards,
    shuffledCards,
    loading
  }
}