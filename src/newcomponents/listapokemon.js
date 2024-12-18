import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]); // Lista de Pokémon
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon'); // URL de la página actual
  const [nextPageUrl, setNextPageUrl] = useState(null); // URL de la próxima página
  const [prevPageUrl, setPrevPageUrl] = useState(null); // URL de la página anterior
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Llamar a la API cuando cambie la URL de la página
    setLoading(true);
    fetch(currentPageUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setPokemonList(data.results); // Resultados de Pokémon
        setNextPageUrl(data.next); // URL de la próxima página
        setPrevPageUrl(data.previous); // URL de la página anterior
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, [currentPageUrl]);

  // Funciones para cambiar de página
  const handleNextPage = () => {
    if (nextPageUrl) setCurrentPageUrl(nextPageUrl);
  };

  const handlePrevPage = () => {
    if (prevPageUrl) setCurrentPageUrl(prevPageUrl);
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {pokemonList.map((pokemon) => (
              <li key={pokemon.name}>
                {pokemon.name}
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handlePrevPage} disabled={!prevPageUrl}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={!nextPageUrl}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
