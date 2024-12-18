import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokeApp = () => {
    const [pokemon, setPokemon] = useState(null);
    useEffect(() => {
    axios
    .get('https://pokeapi.co/api/v2/pokemon/pikachu')
        .then(response => setPokemon(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log('hello',pokemon);

    return (
    <div>
        <h1>Pokémon Data</h1>
        {pokemon ? (
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
        </div>
        ) : (
        <p>Loading...</p>
        )}
    </div>
    );
};

export default PokeApp;
