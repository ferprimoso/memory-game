const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};


export default function PokemonCard({ id, pokemon, isFlipped, handleCardClicked }) {

    // const handleCardTurn = () => {
    //     if (!cardReveled) {
    //         setCardTurned(true);
    //         handleCardClicked(id)
    //     }
    // }

    return (
        <>
            <div key={id} className="card" onClick={() => handleCardClicked(id)}>
                <div className={isFlipped ? 'card-inner is-flipped' : 'card-inner'}>
                    <div className="card-front">
                    </div>
                    <div className="card-back" style={{ backgroundColor: colours[pokemon.types[0].type.name] }}>
                        <div className="sprite-container">
                            <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default} alt={pokemon.name} />
                        </div>
                        <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

{/* <>
<div key={id} className="card" onClick={() => handleCardClicked(id)}>
    <div className={isFlipped ? 'card-inner is-flipped' : 'card-inner'}>
        {!isFlipped && (
            <div className="card-front">
                <h1>Pokemon</h1>
            </div>
        )}
        {isFlipped && (
            <div className="card-back">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <h1>{pokemon.name}</h1>
            </div>
        )}
    </div>
</div>
</> */}