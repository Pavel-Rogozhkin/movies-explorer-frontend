import './MoviesList.css';
// import moviesArray from '../../utils/moviesArray'; // default movies
import MovieItem from '../MovieItem/MovieItem';
import { useState, useEffect } from 'react';

function MoviesList({
    filteredMovies,
    isButtonMoreUnvisible,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
    windowWidth,
}) {

    const [moviesList, setMoviesList] = useState(filteredMovies);
    const [params, setParams] = useState({ curNum: 12, moreNum: 3 });

    // console.log(filteredMovies);

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
            const list = savedMovies.filter((m, i) => params.curNum >= i );
            setMoviesList(list);
        } else {
            const list = filteredMovies.filter((m, i) => params.curNum >= i );
            setMoviesList(list);
        }
    }, [savedMovies, filteredMovies] );
    
    // console.log(moviesList);

    return (
        <section className='movies-list__container'>
            <ul className='movies-list'>
                {moviesList.map(movie => (
                    <MovieItem
                        movie={movie}
                        isSaveButtonTypeDelete={isSaveButtonTypeDelete}
                        savedMovies={savedMovies}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                    />
                ))}
            </ul>
            <p className='movies-list__error'>
                {moviesList.length === 0 ?
                    'Ничего не найдено'
                    :
                    ''
                }
            </p>
            <button 
                className={`movies-list__more ${(isButtonMoreUnvisible || moviesList.length === 0) ? 'movies-list__more_unvisible' : ''}`}
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
