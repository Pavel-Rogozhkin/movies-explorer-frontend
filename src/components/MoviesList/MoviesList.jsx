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
    const [params, setParams] = useState({ curNum: 0, moreNum: 0 });

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
    }, [windowWidth] );

    console.log(params.curNum);
    console.log(params.moreNum);

    useEffect(() => {
        // console.log(params.curNum);
        const list = filteredMovies.filter((m, i) => params.curNum >= m.id );
        // console.log(list);
        setMoviesList(list);
    }, [filteredMovies, params.curNum] );

    // console.log(Array.isArray(movies));
    // console.log(movies);
    // console.log(Array.isArray(moviesList));
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
