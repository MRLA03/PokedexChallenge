import { useEffect } from 'react'


const Tarjeta = ({pokemon, pokemonListData, setPokemonListData}) =>{    
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()
    
    useEffect(() => {
        const fetchPokemonData = async () => {
          try {
            const response = await P.getPokemonByName(pokemon.name);
            setPokemonListData(prevState => ({
              ...prevState,
              [pokemon.name]: response
            }));
          } catch (error) {
            console.error('Error fetching Pokémon data:', error);
          }
        };
    
        if (!pokemonListData[pokemon.name]) {
          fetchPokemonData();
        }
    }, [P, pokemon.name, pokemonListData, setPokemonListData]);

    const pokemonI = pokemonListData[pokemon.name] || {};
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