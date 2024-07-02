//import { useState, useEffect } from 'react'
import React from 'react'
import Tarjeta from './tarjeta';
import '../index.css'

const Contenido = ({pokemonList, pokemonListData, setPokemonListData}) =>{        
    return(
    <div className='contenedor'>
        {pokemonList.map((pokemon,index) =>(
          <Tarjeta key={index} pokemon={pokemon} pokemonListData={pokemonListData} setPokemonListData={setPokemonListData}/>
        ))}        
    </div>);
}

export default Contenido