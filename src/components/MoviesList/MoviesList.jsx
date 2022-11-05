import './MoviesList.css';
import moviesArray from '../../utils/moviesArray';
import MovieItem from '../MovieItem/MovieItem';
import { useState, useEffect } from 'react';

function MoviesList({
    isButtonMoreUnvisible,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
}) {

    const [moviesList, setMoviesList] = useState(moviesArray);
    const [params, setParams] = useState({ curNum: 0, moreNum: 0 });

    function handleMore() {

    };

    return (
        <section className='movies-list__container'>
            <ul className='movies-list'>
                {moviesList.map(movie => (
                    <MovieItem
                        key={movie.movieId ? movie.movieId : movie._id}
                        movie={movie}
                        isSaveButtonTypeDelete={isSaveButtonTypeDelete}
                        savedMovies={savedMovies}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                    />
                ))}
            </ul>
            <button 
                className={`movies-list__more ${isButtonMoreUnvisible ? 'movies-list__more_unvisible' : ''}`}
                type='button'
                aria-label="Ещё"
                onClick={handleMore}
            >
                Ещё
            </button>
        </section>
    );

};

export default MoviesList;
