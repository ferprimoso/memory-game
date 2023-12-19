import './styles/app.scss'
import { useEffect, useState } from 'react'
import PokemonCard from './components/PokemonCard';
import axios from 'axios';
import GameMenu from './components/GameMenu';
import Button from './components/Button';
import Modal from './components/Modal';
import GitHub from './components/Github';

function App() {
  const [pokemons, setPokemons] = useState(null)
  const [difficult, setDifficult] = useState('easy')
  const [gameStarted, setGameStarted] = useState(false)
  const [lastFlippedCard, setLastFlippedCard] = useState(null)
  const [isClickable, setIsClickable] = useState(true)
  const [findedPokemons, setFindedPokemons] = useState([])
  const [isGameWon, setIsGameWon] = useState(null);


  //time r
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    // Clear the interval when the component is unmounted
    return () => clearInterval(timerInterval);
  }, [timerInterval]);


  useEffect(() => {
    let numberOfPokemons = 0;
    difficult === 'easy'
      ? (numberOfPokemons = 4)
      : difficult === 'medium'
        ? (numberOfPokemons = 9)
        : (numberOfPokemons = 16);

    getPokemons(numberOfPokemons);
  }, [difficult]);

  useEffect(() => {
    if (pokemons && findedPokemons.length === pokemons.length) {
      setIsGameWon(true);
    }
  }, [findedPokemons, pokemons]);

  useEffect(() => {
    if (isGameWon) {
      // Perform actions when the game is won after the initial render
      clearInterval(timerInterval); // Clear the interval when the game is won
    }
  }, [isGameWon, timer, timerInterval]);

  // const closeModal = () => {
  //   setIsGameWon(false);
  // };

  const getPokemons = (n) => {
    const lastIds = []
    const endpoints = []
    for (let i = 0; i < n; i++) {
      let randomId = Math.floor(Math.random() * 649)

      //check for duplicate pokemons id
      while (lastIds.includes(randomId)) {
        randomId = Math.floor(Math.random() * 649)
      }

      endpoints.push('https://pokeapi.co/api/v2/pokemon/' + randomId)
      lastIds.push(randomId)
    }

    axios.all(endpoints.map(endpoint => axios.get(endpoint)))
      .then(responses => {
        // Extract data from each response
        const data = responses.map(response => ({ id: response.data.id.toString().padStart(3, '0'), content: response.data, isFlipped: false }));
        data.push(...data.map(card => ({ ...card, id: card.id + 'pair' })))

        //algorithm to shuffle the pokemons
        for (var i = data.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
        setPokemons(data);
      })
      .catch(error => console.error('Error fetching Pokemon data:', error));

    console.log('pokegetted');
  }

  const changeDifficult = (diff) => {
    setDifficult(diff);
  }

  const startGame = () => {
    setGameStarted(true)

    setTimerInterval(
      setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000)
    );

  }


  const handleCardClicked = async (id) => {
    if (findedPokemons.includes(id) || !isClickable || id === lastFlippedCard) {
      return; // Clicking not allowed during delay
    }

    setIsClickable(false); // Disable clicking during delay

    if (lastFlippedCard === null) {
      setPokemons(pokemons.map((pokemon =>
        pokemon.id === id ? { ...pokemon, isFlipped: !pokemon.isFlipped } : pokemon
      )))
      setLastFlippedCard(id)
    } else {
      // páir finded
      if (lastFlippedCard !== id && lastFlippedCard.slice(0, 3) === id.slice(0, 3)) {
        console.log('You find the pair!');
        console.log(lastFlippedCard, id);
        setPokemons(pokemons.map((pokemon =>
          pokemon.id === id ? { ...pokemon, isFlipped: !pokemon.isFlipped } : pokemon
        )))
        setFindedPokemons([...findedPokemons, id, lastFlippedCard])
        setLastFlippedCard(null)

        console.log(findedPokemons)
      } else {
        //reset flipped cards and lastflippedcard
        setPokemons(pokemons.map((pokemon =>
          pokemon.id === id ? { ...pokemon, isFlipped: !pokemon.isFlipped } : pokemon
        )))

        // wait a second then flipp back
        await new Promise((resolve) => setTimeout(resolve, 1000));


        setPokemons(pokemons.map((pokemon =>
          (pokemon.id === lastFlippedCard) ? { ...pokemon, isFlipped: !pokemon.isFlipped } : pokemon
        )))

        setLastFlippedCard(null)
      }
    }


    // Simulate a delay, e.g., 1000 milliseconds (1 second)
    await new Promise((resolve) => setTimeout(resolve, 500));


    // Enable clicking again after the delay
    setIsClickable(true);
  }

  const playAgain = () => {
    window.location.reload();
  };


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
            <div className='game-header'>
              <div className='title-wrapper'>
                <img src='src/assets/pokemonlogo.svg' alt="Pokemon Logo" />
                <h1>Memory Game</h1>
              </div>
              <h1 className='timer'>Time: {timer} </h1>
            </div>
            <div className='game-grid'>
              <div className={difficult === 'easy' ? 'cards-grid-easy' : difficult === 'medium' ? 'cards-grid-medium' : 'cards-grid-hard'}>
                {pokemons.map((pokemon) => (

                  <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id}
                    pokemon={pokemon.content}
                    isFlipped={pokemon.isFlipped}
                    handleCardClicked={handleCardClicked}
                  />
                ))}
                {/* <button onClick={() => console.log(pokemons)}></button> */}
              </div>
            </div>
          </div>
        )}
        {isGameWon && <Modal playAgain={playAgain} time={timer} />}

        <GitHub />
      </main>

    </>
  )
}

export default App
