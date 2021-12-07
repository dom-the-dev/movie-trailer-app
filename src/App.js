import {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';
import Movie from "./components/Movie";

function App() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "e588720192965bd88bddb2ca0700875d"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        setMovies(data.results)
        console.log(data.results[0])
        setMovie(data.results[0])
    }


    const selectMovie = (movie) => {
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )

    return (
        <div className="App">
            <header className="center-max-size header">
                <span>Movie App</span>
                <form className="form" onSubmit={fetchMovies}>
                    <input type="text" id="search" onInput={(event) => setSearchKey(event.target.value)}/>
                    <button type="submit">Search</button>
                </form>
            </header>
            <main>
                <div className="poster" style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                    <div className="center-max-size">
                        <div className="poster-content">
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>

                <div className={"center-max-size container"}>
                    {renderMovies()}
                </div>
            </main>
        </div>
    );
}

export default App;
