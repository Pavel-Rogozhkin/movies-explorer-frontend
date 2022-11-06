import './MoviesList.css';
import moviesArray from '../../utils/moviesArray'; // default movies
import MovieItem from '../MovieItem/MovieItem';
import { useState, useEffect } from 'react';

function MoviesList({
    filteredMovies,
    isButtonMoreUnvisible,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
}) {

    const [moviesList, setMoviesList] = useState(moviesArray);
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

    // Hook useWindowSize
    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });
        useEffect(() => {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }, [] );
        return windowSize;
    };

    const windowWidth = useWindowSize().width;

    useEffect(() => {
        if (windowWidth > 1279) {
            setParams({
                curNum: 12,
                moreNum: 3,
            });
        } else if (windowWidth > 481) {
            setParams({
                curNum: 8,
                moreNum: 2,
            });
        } else {
            setParams({
                curNum: 5,
                moreNum: 1,
            });
        };
    }, [windowWidth] );

    useEffect(() => {
        if (filteredMovies.length && isSaveButtonTypeDelete) {
            const list = filteredMovies.filter((m, i) => i < params.curNum );
            setMoviesList(list);
        } else {
            setMoviesList(filteredMovies);
        };
    }, [filteredMovies, isSaveButtonTypeDelete, params.curNum] )

    
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
