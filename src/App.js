import logo from './logo.svg';
import './App.css';
import PrimerComponente  from './newcomponents/PrimerComponente';
import PokemonLista  from './newcomponents/listapokemon';
import PokemonListaV2  from './newcomponents/listapokemon_v2';
import PokemonListaV3  from './newcomponents/listapokemon_v3';
import PokemonListaV4  from './newcomponents/listapokemon_v4';
function App() {
  return (
    <div className="App">
    {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
  
      <PokemonListaV4/>
      
    </div>
  );
}

export default App;
