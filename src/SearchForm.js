import React, { useRef, useState } from 'react'
import "./searchform.css"
import axios from "axios"
import { useMovie } from "./MovieContext/movieContext"
import { useHistory } from 'react-router-dom'

const fetchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=24e3fa79c3d9ef3de668bd674f99bc15&query='

export default function SearchForm({ imageBase }) {
  const { setMovieDetails } = useMovie()
  const history = useHistory()
  const SearchRef = useRef()
  const [searchMovie, setSearchMovie] = useState([])
  const onSearch = async (e) => {
    e.preventDefault()
    const request = await axios(`${fetchUrl}${SearchRef.current.value}`)
    try {
      setSearchMovie(request.data.results)
    } catch {
      console.log("Error:", Error)
    }
  }
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }
  function ShowDetails(movie) {
    setMovieDetails(movie)
    history.push("/details")
  }
  return (
    <div className="search_-container">
      <form className="search_form" onSubmit={onSearch}>
        <input placeholder="Search movies.." type="text" ref={SearchRef} />
        <button type="submit">Search</button>
      </form>
      {
        searchMovie.length ? <h4 className="search_result_title">Search Results..</h4> : ""
      }

      {
        searchMovie.map((movie, index) => {
          if (movie.backdrop_path === null) return null
          return <div key={index} className="column_search_result" onClick={() => ShowDetails(movie)} >
            <img className="column_search_image" src={`${imageBase}${movie.backdrop_path}`} alt={movie.name || movie.title} />
            <div className="movie_info">
              <h1 className="movie_title">{movie.name || movie.title}</h1>
              <p className="movie_description"> {truncate(movie.overview, 200)}</p>
            </div>
          </div>

        })
      }

    </div>
  )
}
