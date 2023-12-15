export default function Button({ string, difficult, clickHandler }) {
    return (
        <button onClick={() => clickHandler(string)} className={difficult === string ? 'active' : null}>
            {string}
        </button>
    )
}
