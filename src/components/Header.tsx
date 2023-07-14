import { useMemory } from "../contexts/MemoryContext"

const Header = () => {
	const { idFoundPairsCards, cards, numbersCardsFlipped, startGame } = useMemory()
 
  const finished = cards.length === idFoundPairsCards.length * 2 
  const start = cards.length === 0
  const hitRate = cards.length / numbersCardsFlipped * 100

	return (
		<div 
			className={`fixed top-0 left-0 flex justify-center items-center w-full 
			h-full backdrop-blur-sm ${finished ? '' : 'hidden'}`}
		>
      {
        start ? (
          <div 
            className="flex flex-col items-center text-white gap-y-5
            bg-gray-500 p-8 rounded-xl"
          >
            <h1 className="text-center font-bold text-2xl">
              Este é um Jogo da Memória Diferente
            </h1>

            <p className="text-center">Ao invés de 02 imagens iguais,<br/>
                temos 01 imagem e 01 palavra correspodente em inglês
            </p>

            <p className="text-center font-bold text-2xl">
              Ouça a palavra em Inglês a cada carta virada
            </p>

            <button 
              onClick={startGame}
              className="bg-black font-bold py-2 w-full rounded-xl hover:cursor-pointer"
            >
              Iniciar partida
            </button>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center text-white gap-y-5
            bg-gray-500 p-8 rounded-xl"
          >
            <p>Seu nível de memória é:</p>
            <h1>Bom</h1>
            <p>
              <strong>Taxa de acertos:</strong>
              <span className="ml-2">{hitRate.toFixed(0)}%</span>
            </p>
            
            <button 
              onClick={startGame}
              className="bg-black py-2 w-1/2 rounded-xl hover:cursor-pointer"
            >
              Nova partida
            </button>

            <p>
              <small>
                * Essa análise é ilustrativa e não possui base científica.
              </small>
            </p>
          </div>
        )
      }
		</div>
	)
}

export default Header
