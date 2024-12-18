import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]); // Lista de Pokémon
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=6'); // URL de la página actual con límite predeterminado
  const [nextPageUrl, setNextPageUrl] = useState(null); // URL de la próxima página
  const [prevPageUrl, setPrevPageUrl] = useState(null); // URL de la página anterior
  const [loading, setLoading] = useState(true); // Estado de carga
  const [itemsPerPage, setItemsPerPage] = useState(6); // Número de Pokémon por página
  const [searchQuery, setSearchQuery] = useState(''); // Valor del campo de búsqueda
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Pokémon seleccionado para mostrar detalles

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
    const newLimit = parseInt(event.target.value, 6);
    setItemsPerPage(newLimit);
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon?limit=${newLimit}`);
  };

  // Cambiar página
  const handleNextPage = () => {
    if (nextPageUrl) setCurrentPageUrl(nextPageUrl);
  };

  const handlePrevPage = () => {
    if (prevPageUrl) setCurrentPageUrl(prevPageUrl);
  };

  // Buscar Pokémon por nombre
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a Pokémon name to search.');
      return;
    }
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) throw new Error('Pokémon not found');
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setSelectedPokemon(data); // Mostrar detalles del Pokémon buscado
        setPokemonList([]); // Vaciar la lista
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching Pokémon:', error);
        alert('Pokémon not found. Please try again.');
      });
  };

  // Mostrar detalles del Pokémon seleccionado
  const handlePokemonClick = (pokemonUrl) => {
    setLoading(true);
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSelectedPokemon(data); // Guardar detalles del Pokémon
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching Pokémon details:', error);
      });
      console.log ('TestPoekemon_', pokemonList)
  };
  console.log ('TestPoekemon_', pokemonList)

  return (
    <div>
      <h1>Pokémon List</h1>

      {/* Campo de búsqueda */}
      <div>
        <input
          type="text"
          placeholder="Search Pokémon by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Seleccionar límite por página */}
      {/* <label htmlFor="itemsPerPage">Pokémon per page: </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select> */}

      {/* Estado de carga */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Detalles del Pokémon seleccionado */}
          {selectedPokemon ? (
            <div>
              <h2>{selectedPokemon.name}</h2>
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
              <p>Height: {selectedPokemon.height}</p>
              <p>Weight: {selectedPokemon.weight}</p>
              <p>Abilities:</p>
              <ul>
                {selectedPokemon.abilities.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
              <button onClick={() => setSelectedPokemon(null)}>
                Back to List
              </button>
            </div>
          ) : (
            // Listado de Pokémon
            <div>
              <ul>
                {pokemonList.map((pokemon) => (
                  <li key={pokemon.name}>
                    <button onClick={() => handlePokemonClick(pokemon.url)}>
                      {pokemon.name}
                    </button>
                  </li>
                ))}
              </ul>
              {/* Botones de paginación */}
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
            <div class="card-body pt-6">
              <div class="table-responsive">
                <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                    <thead>
                        <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
                            <th class="p-0 pb-3 min-w-175px text-start">Name</th>
                            <th class="p-0 pb-3 min-w-100px text-end">Image</th>
                            <th class="p-0 pb-3 min-w-100px text-end">Height</th>
                            <th class="p-0 pb-3 min-w-175px text-end pe-12">Abilities</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pokemonList.map((pokemon) => (
                 

                  <tr>
                    <td>
                      <h2>  {pokemon.name}</h2>
                    </td>

                    {/* <td class="text-end pe-0">
                      <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}/>
                    </td>
                    <td class="text-end pe-0">
                      <p>Height: {selectedPokemon.height}</p>
                    </td>
                    <td class="text-end pe-12">
                      <p>Weight: {selectedPokemon.weight}</p>
                    </td> */}

                    </tr>
                ))}


                    

                    </tbody>
                </table>
              </div>
            </div>




        </div>
      )}
    </div>
  );
};

export default PokemonList;
 /* <li key={pokemon.name}>
                    <button onClick={() => handlePokemonClick(pokemon.url)}>
                      {pokemon.name}
                    </button>
                  </li> */