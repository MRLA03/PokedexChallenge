import { useState, useEffect } from 'react'
import PokebolaCarga from './pokebolaCarga';
const Tarjeta = ({pokemon, pokemonListData, setPokemonListData}) =>{ 
    const [cargando, setCargando] = useState(true);        
    useEffect(() => {
        const fetchPokemonData = async () => {
          const Pokedex = require("pokeapi-js-wrapper")
          const P = new Pokedex.Pokedex()
          try {
            const response = await P.getPokemonByName(pokemon.name);
            console.log(response);
            setPokemonListData(prevState => ({
              ...prevState,
              [pokemon.name]: response
            }));
            setCargando(false);
          } catch (error) {
            console.error('Error al obtener los datos', error);
            setCargando(false);
          }
        };
    
        if (!pokemonListData[pokemon.name]) {
          setCargando(true);
          fetchPokemonData();
        }else{
          setCargando(false);
        }
    }, [pokemon.name, pokemonListData, setPokemonListData]);

    const pokemonI = pokemonListData[pokemon.name] || {};
    
    return (
        <div className="tarjeta">  
          {cargando ? (
            <PokebolaCarga/> // Mostrar el componente de carga mientras se carga la imagen
          ) : (
            <div>
              <img className='imagen'
                width={300}
                height={300}
                src={pokemonI.sprites?.front_default || ''}
                alt={pokemonI.name}
              />
              
              <div className='info'>
                <div style={{ marginBottom: '4%' }}>

                  <h4>Información Básica</h4>
                  <div>
                    {pokemonI.height / 10} m
                  </div>
                  <div>
                    {pokemonI.weight / 10} kg
                  </div>
                </div>

                <div>
                  {pokemonI.base_experience} exp
                </div>
                {pokemonI.types && (
                  <div>
                    <h4 style={{ marginBottom: '-5%' }}>Tipo</h4>
                    <ul>
                      {pokemonI.types.map((type, index) => (
                        <li key={index}>{type.type.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {pokemonI.stats && (
                  <div>
                    <h4 style={{ marginBottom: '-5%' }}>Puntos Base</h4>
                    <ul>
                      {pokemonI.stats.map((st, index) => (
                        <li key={index}>{st.stat.name} - {st.base_stat}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/*console.error(pokemonI)*/}
              </div>
              <div className="texto">
                <h3 className="text-2xl font-bold">
                  #{pokemonI.id} - {pokemonI.name}
                </h3>
              </div>
            </div>
          )}
        </div>
    )
}
export default Tarjeta;