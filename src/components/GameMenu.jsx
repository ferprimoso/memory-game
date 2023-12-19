export default function GameMenu({ children, startGame }) {
    return (
        <div className="game-menu">
            <div className="header">
                <img src='src/assets/pokemonlogo.svg' alt="Pokemon Logo" />
                <h1>Memory Game</h1>
            </div>

            <div className="options">
                <div className="buttons-container">
                    <span>difficult: </span>
                    {children}
                </div>
                <button className="start-button" onClick={startGame}>
                    Start Game
                </button>
            </div>
        </div>
    )
}
