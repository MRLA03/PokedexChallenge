
import './App.css';
import Contenido from './components/contenido';

function App() {
  /*const [pokemonList, setPokemonList] = useState([]);
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()
    useEffect(() => {
        const pokemones = async () => {
          try {
            const response = await P.getPokemonsList();
            setPokemonList(response.results);
          } catch (error) {
            console.error('Error al inicializar la lista:', error);
          }
        };
    
        pokemones();
      }, []);*/  
  return (
    <div className="App">
      <header className="App-header">
        <Contenido/>
      </header>
    </div>
  );
}

export default App;
