export default function GameMenu({ children, startGame }) {
    return (
        <div className="game-menu">
            <h1>Pokemon Memory Game</h1>
            <div className="buttons-container">
                {children}
            </div>
            <button onClick={startGame}>
                Start Game
            </button>
        </div>
    )
}
