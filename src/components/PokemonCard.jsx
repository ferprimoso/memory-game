import { useState } from "react"

export default function PokemonCard({ id, pokemon, handleCardClicked }) {
    const [cardTurned, setCardTurned] = useState(false)
    const [cardReveled, setCardReveled] = useState(false)


    const handleCardTurn = () => {
        if (!cardReveled) {
            setCardTurned(true);
            handleCardClicked(id)
        }
    }

    return (
        <>
            <div className="card" onClick={handleCardTurn}>
                <div className="card-inner">
                    {!cardTurned && (
                        <div className="card-front">
                            <h1>Pokemon</h1>
                        </div>
                    )}
                    {cardTurned && (
                        <div className="card-back">
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <h1>{pokemon.name}</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}