import { useState } from "react"

export default function PokemonCard({ pokemon }) {
    const [cardTurned, setCardTurned] = useState(false)

    const handleCardTurn = () => {
        setCardTurned(!cardTurned)
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