import { useState, useEffect } from 'react';
import './App.css';
import Contenido from './components/contenido';

function App() {
  const [pokemonList, setPokemonList] = useState(() => {
    const storedPokemonList = localStorage.getItem('pokemonList');
    return storedPokemonList ? JSON.parse(storedPokemonList) : [];
  });

  const [pokemonListData, setPokemonListData] = useState(() => {
    const storedPokemonList = localStorage.getItem('pokemonListData');
    return storedPokemonList ? JSON.parse(storedPokemonList) : [];
  });
  
  const Pokedex = require("pokeapi-js-wrapper");
  const P = new Pokedex.Pokedex();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await P.getPokemonsList();
        const pokemons = response.results;
        setPokemonList(pokemons);     
        localStorage.setItem('pokemonList', JSON.stringify(pokemons));

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
  }, [P, pokemonList.length]); 
  return (
    <div className="App">
      <header className="App-header">
        <Contenido pokemonList={pokemonList} pokemonListData={pokemonListData} setPokemonListData={setPokemonListData}/>
      </header>
    </div>
  );
}

export default App;
