import './styles/app.scss'
import { useEffect, useState } from 'react'
import PokemonCard from './components/PokemonCard';
import axios from 'axios';
import GameMenu from './components/GameMenu';
import Button from './components/Button';

function App() {
  const [pokemons, setPokemons] = useState([])
  const [difficult, setDifficult] = useState('easy')
  const [gameStarted, setGameStarted] = useState(false)
  // const [lastFlippedCard, setLastFlippedCard] = useState(null)

  let lastFlippedCard = null

  useEffect(() => {
    let numberOfPokemons = 0;
    difficult === 'easy'
      ? (numberOfPokemons = 4)
      : difficult === 'medium'
        ? (numberOfPokemons = 8)
        : (numberOfPokemons = 16);

    getPokemons(numberOfPokemons);
  }, [difficult]);


  const getPokemons = (n) => {
    const endpoints = []
    for (let i = 0; i < n; i++) {
      endpoints.push('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 906))
    }

    axios.all(endpoints.map(endpoint => axios.get(endpoint)))
      .then(responses => {
        // Extract data from each response
        const data = responses.map(response => response.data);
        setPokemons(data);
      })
      .catch(error => console.error('Error fetching Pokemon data:', error));

    console.log('pokegetted');
  }


  function ShuffledPokemonCards() {
    const allCards = pokemons.map(pokemon => (
      <PokemonCard
        key={pokemon.id + ''}
        id={pokemon.id + ''}
        pokemon={pokemon}
        handleCardClicked={handleCardClicked}
      />
    ))
    allCards.push(pokemons.map(pokemon => (
      <PokemonCard
        key={pokemon.id + 'copy'}
        id={pokemon.id + 'copy'}
        pokemon={pokemon}
        handleCardClicked={handleCardClicked}
      />
    )))

    //algorithm to shuffle the cards
    for (var i = allCards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = allCards[i];
      allCards[i] = allCards[j];
      allCards[j] = temp;
    }

    return (
      <>
        {allCards}
      </>
    )
  }


  const changeDifficult = (diff) => {
    setDifficult(diff);
  }

  const startGame = () => {
    setGameStarted(true)
  }

  const handleCardClicked = (id) => {
    if (lastFlippedCard !== id && lastFlippedCard === id.slice(0, 3)) {
      console.log('you find the pair!')
    } else {

      console.log(id);
      lastFlippedCard = id
    }
  }


  return (
    <>
      <main>
        {!gameStarted && (
          <GameMenu startGame={startGame} >
            <Button string={'easy'} difficult={difficult} clickHandler={changeDifficult} />
            <Button string={'medium'} difficult={difficult} clickHandler={changeDifficult} />
            <Button string={'hard'} difficult={difficult} clickHandler={changeDifficult} />
          </GameMenu>
        )}
        {gameStarted && (
          <div className="game-container">
            <div className='game-grid'>
              <div className={difficult === 'easy' ? 'cards-grid easy' : difficult === 'medium' ? 'cards-grid medium' : 'cards-grid hard'}>
                <ShuffledPokemonCards />
              </div>
            </div>
          </div>
        )}
      </main>

    </>
  )
}

export default App
