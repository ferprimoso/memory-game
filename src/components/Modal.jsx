const Modal = ({ playAgain, time }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Congratulations!</h2>
                <p>You completed the game in {time} seconds.</p>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    );
};

export default Modal;
