import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=6'
  );
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    // Llama a la API para obtener la lista de Pokémon
    fetch(currentPageUrl)
      .then((response) => response.json())
      .then((data) => {
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);

        // Realiza solicitudes para obtener detalles de cada Pokémon
        return Promise.all(
          data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        );
      })
      .then((detailedPokemon) => {
        setPokemonList(detailedPokemon); // Guarda los detalles de los Pokémon
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching Pokémon details:', error);
      });
  }, [currentPageUrl]);
  const fetchPokemonList = (url) => {
    // Lógica para cargar la lista desde una URL
  };
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a Pokémon name to search.');
      fetchPokemonList(currentPageUrl);
      return;
    }
  
    setLoading(true);

    // Llama a la API para buscar un Pokémon por nombre
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) throw new Error('Pokémon not found');
        return response.json();
      })
      .then((pokemon) => {
        setPokemonList([pokemon]);
        setNextPageUrl(null); // No hay siguiente página en una búsqueda
        setPrevPageUrl(null); // No hay página anterior en una búsqueda
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error  Pokémon:', error);
        alert('Pokémon no encontrado');
        fetchPokemonList(currentPageUrl); // Si no lo encuentra, regresa a la lista original
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="container">
      <h3 className="text-center my-1">Angel Orlando Itza Poot</h3>

      {/* Campo de búsqueda */}
      {/* <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokémon by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
      </div> */}
      <div
          className="card rounded-0 shadow-none border-0 bgi-no-repeat bgi-position-x-end bgi-size-cover"
          style={{
            backgroundColor: "rgb(255, 0, 0)",
            backgroundSize: "auto 100%",
            backgroundImage: 'url("/metronic8/react/demo4/media/misc/taieri.svg")'
          }}
        >
        <div className="card-body container-xxl pt-10 pb-8 text-white">
        <div className=" d-flex align-items-center">
          <h1 className="fw-bold me-3 " 
           style={{
            backgroundSize: "auto 100%",
            backgroundImage: 'url("/metronic8/react/demo4/media/misc/taieri.svg")'
          }}>Pokédex</h1>
        </div>



        <div className="d-flex flex-column">
          <div className="col-lg-12">
          <div className="col-lg-6">
          <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center 
            bg-body p-3 w-xxl-850px h-lg-60px me-lg-10 my-2">
              <div className="row flex-grow-1 mb-5 mb-lg-0">
                <div className="col-lg-12 d-flex align-items-center mb-3 mb-lg-0">
                  <i className="ki-duotone ki-magnifier fs-1 text-gray-500 me-1">
                    <span className="path1" />
                    <span className="path2" />
                  </i>
                  <input
                    type="text"
                    className="form-control form-control-flush flex-grow-1 mr-12"
                    name="search"
                    placeholder="Search Pokémon by name"
                  
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
               
                
              </div>
              <div className="min-w-150px text-end">
                <button
                  type="submit"
                  className="btn btn-primary "
                  id="kt_advanced_search_button_1"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* <div className="d-lg-flex align-lg-items-center"></div> */}
            
            
          </div>
        </div>
        </div>
      </div>






      {/* Tabla con detalles de los Pokémon */}
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Abilities</th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.map((pokemon, index) => (
              <tr key={pokemon.id}>
                <td>{index + 1}</td>
                <td>{pokemon.name}</td>
                <td>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="img-fluid"
                    style={{ maxWidth: '50px' }}
                  />
                </td>
                <td>{pokemon.height}</td>
                <td>{pokemon.weight}</td>
                <td className="">
                  <ul>
                    {pokemon.abilities.map((ability) => (
                      <li key={ability.ability.name}>{ability.ability.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Botones de paginación */}
      <div className="mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setCurrentPageUrl(prevPageUrl)}
          disabled={!prevPageUrl}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPageUrl(nextPageUrl)}
          disabled={!nextPageUrl}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
