import { useState, useEffect } from 'react'
import React from 'react'
import Tarjeta from './tarjeta';
import '../index.css'

const Contenido = () =>{    
    const [pokemonList, setPokemonList] = useState([]);
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
      }, []);
    return(
    <div className='contenedor'>
      {/*  {pokemonList.map((pokemon,index) =>(
          <Tarjeta key={index} pokemon={pokemon} />
        ))}   */ }    
    </div>);
}

export default Contenido