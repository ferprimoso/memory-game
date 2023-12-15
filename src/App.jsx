import './App.css'

function App() {

  fetch('https://pokeapi.co/api/v2/pokemon/').then((resp) => resp.json()).then(res => console.log(res))


  return (
    <>
      <h1>text</h1>
    </>
  )
}

export default App
