import { useEffect } from 'react'


const Tarjeta = ({pokemon, pokemonListData, setPokemonListData}) =>{         
    useEffect(() => {
        const fetchPokemonData = async () => {
          const Pokedex = require("pokeapi-js-wrapper")
          const P = new Pokedex.Pokedex()
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
    }, [pokemon.name, pokemonListData, setPokemonListData]);

    const pokemonI = pokemonListData[pokemon.name] || {};
    return (
        <div className="tarjeta">          
            <img className='texto'
                width={300}
                height={300}
                src={pokemonI.sprites?.front_default || ''}
                alt={pokemonI.name}
            />

            <div className="texto">
                <h3 className="text-2xl font-bold">
                    {pokemonI.name}                       
                </h3>           
            </div>
        </div>
    )
}
export default Tarjeta;