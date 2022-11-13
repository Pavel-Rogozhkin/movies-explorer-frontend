import './MoviesList.css';
// import moviesArray from '../../utils/moviesArray'; // default movies
import MovieItem from '../MovieItem/MovieItem';
import { useState, useEffect } from 'react';

function MoviesList({
    movies,
    filteredMovies,
    isButtonMoreUnvisible,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
    windowWidth,
}) {

    const [moviesList, setMoviesList] = useState(movies);
    const [params, setParams] = useState({ curNum: 12, moreNum: 3 });

    function handleMore() {
        if ((filteredMovies.length - moviesList.length) > 0) {
            const addMovies = filteredMovies.slice(
                moviesList.length,
                moviesList.length + params.moreNum,
            );
            setMoviesList([ ...moviesList, ...addMovies ]);
        };
    };

    useEffect(() => {
        if (windowWidth > 1279) {
            setParams({
                curNum: 12,
                moreNum: 3,
            });
        }
        if (windowWidth > 481 && windowWidth <= 1279) {
            setParams({
                curNum: 8,
                moreNum: 2,
            });
        }
        if (windowWidth <= 481) {
            setParams({
                curNum: 5,
                moreNum: 1,
            });
        };
    }, [] );

    useEffect(() => {
        if (isSaveButtonTypeDelete) {
            setMoviesList(savedMovies);
        } else {
            const list = moviesList.filter((m, i) => params.curNum >= m.id );
            setMoviesList(list);
        }
    }, [savedMovies] );
    
    return (
        <section className='movies-list__container'>
            <ul className='movies-list'>
                {moviesList.map(movie => (
                    <MovieItem
                        movie={movie}
                        movies={movies}
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
