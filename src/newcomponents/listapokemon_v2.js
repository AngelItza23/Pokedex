import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]); // Lista de Pokémon
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=10'); // URL de la página actual con límite predeterminado
  const [nextPageUrl, setNextPageUrl] = useState(null); // URL de la próxima página
  const [prevPageUrl, setPrevPageUrl] = useState(null); // URL de la página anterior
  const [loading, setLoading] = useState(true); // Estado de carga
  const [itemsPerPage, setItemsPerPage] = useState(10); // Número de Pokémon por página

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

  // Cambiar el límite de Pokémon por página
  const handleItemsPerPageChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setItemsPerPage(newLimit);
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon?limit=${newLimit}`);
  };

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
      <label htmlFor="itemsPerPage">Pokémon per page: </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>

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
