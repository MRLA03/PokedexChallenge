import { useState,useEffect } from 'react'


const Tarjeta = ({pokemon}) =>{
    const [pokemonI, setPokemonI] = useState({});
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()
    
    useEffect(() => {
        P.getPokemonByName(pokemon.name)
        .then(function(response) {
            setPokemonI(response)
        })
    },[]);
  return (
    <div className="tarjeta">

        <img
            width={300}
            height={300}
            src={pokemonI.sprites?.front_default || ''}
            alt={pokemon.name}
        />

        <div className="p5">
            <h3 className="text-2xl font-bold">
                {pokemon.name}                
            </h3>           
        </div>
    </div>
  )
}
export default Tarjeta;