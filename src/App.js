import {useEffect, useState} from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg'


const API_URL = 'https://www.omdbapi.com?apikey=a1ac0089'

const movie1= {
    "Title": "Spiderman",
    "Year": "1990",
    "imdbID": "tt0100669",
    "Type": "movie",
    "Poster": "N/A"
}


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchterm, setSearchTerm] = useState('');

    useEffect(() =>{
        searchMovies('Spiderman');

    }, []);

    //Create API calling function
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder='Search for movies'
                    value={searchterm}
                    onChange={(e)=> {setSearchTerm(e.target.value)}}
                />
                <img
                    scr={SearchIcon}
                    alt="search"
                    onClick={()=> searchMovies(searchterm)}
                />
            </div>
            
            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    );
};


export default App;