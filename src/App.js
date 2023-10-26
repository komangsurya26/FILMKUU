import React, { useEffect, useState } from "react";
import "./App.css";
import IconSearch from "./search.svg";
import MovieCard from "./MovieCard";

//767d8451
const API_URL = "http://www.omdbapi.com?apikey=767d8451";


function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search ? data.Search : []);
  };
  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>MovieKu</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Cari film Kesukaan Anda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
        src={IconSearch} 
        alt="search" 
        onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movies) => (
            <MovieCard movie={movies} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Film Tidak Ditemukan</h2>
        </div>
      )}
    </div>
  );
}

export default App;
