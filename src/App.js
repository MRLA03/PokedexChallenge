import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Contenido from './components/contenido';
import Paginador from './components/paginador';

function App() {
  const [pokemonList, setPokemonList] = useState(() => {
    const storedPokemonList = localStorage.getItem('pokemonList');
    return storedPokemonList ? JSON.parse(storedPokemonList) : [];
  });

  const [pokemonListData, setPokemonListData] = useState(() => {
    const storedPokemonList = localStorage.getItem('pokemonListData');
    return storedPokemonList ? JSON.parse(storedPokemonList) : [];
  });  

  const [paginaActual, setpaginaActual] = useState(1);
  const [cantidadPagina] = useState(6);

  // Función para cambiar de página
  const paginar = numeroPagina => setpaginaActual(numeroPagina);

  // Función para calcular el índice del último Pokémon en la página actual
  const indiceUltimoPokemon = paginaActual * cantidadPagina;
  // Función para calcular el índice del primer Pokémon en la página actual
  const indicePrimerPokemon = indiceUltimoPokemon - cantidadPagina;
  // Función para obtener los Pokémon de la página actual
  const pokemonActuales = pokemonList.slice(indicePrimerPokemon, indiceUltimoPokemon);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const Pokedex = require("pokeapi-js-wrapper");
      const P = new Pokedex.Pokedex();
      try {
        const response = await P.getPokemonsList();        
        setPokemonList(response);     
        localStorage.setItem('pokemonList', JSON.stringify(response));

        /*const informacion = {};
        for (const pokemon of pokemons) {
          const pokemonInfo = await P.getPokemonByName(pokemon.name);
          informacion[pokemon.name] = pokemonInfo;
        }
        setPokemonListData(informacion);
        localStorage.setItem('pokemonListData', JSON.stringify(informacion));*/
      } catch (error) {
        console.error('Error al cargar la lista de Pokémons:', error);
      }
    };

    if (pokemonList.length < 1300) {
      fetchPokemonList();
    }
  }, [pokemonList.length]); 
  return (
    <div className="App">        
      <Paginador
          cantidadPagina={cantidadPagina}
          totalPokemon={pokemonList.length}
          paginate={paginar}
        />
        <Contenido pokemonList={pokemonActuales} pokemonListData={pokemonListData} setPokemonListData={setPokemonListData}/>
        
      
    </div>
  );
}

export default App;
