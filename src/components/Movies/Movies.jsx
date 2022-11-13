import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from "react";
import MoviesApi from '../../utils/MoviesApi';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';

function Movies({
    movies,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
    loading,
    setLoading,
    windowWidth,
}) {

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTask, setSearchTask] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        localStorage.setItem('searchTask', '');
    }, [] );

    function changeCheckbox() {
        setIsChecked(!isChecked);
        localStorage.setItem('isChecked', !isChecked);
        handleFilteredMovies(movies, !isChecked, '')
    };

    function handleFilteredMovies(movies, isChecked, task) {
        const moviesToFilter = movies.filter(m => m.nameRU.toLowerCase().includes(task.toLowerCase()));
        setFilteredMovies(isChecked ?
            moviesToFilter.filter(m => m.duration < 40)
            :
            moviesToFilter.filter(m => m.duration >= 40)
        );
    };

    function handleSubmitSearch(searchTask) {
        if (searchTask) {
            setSearchTask(searchTask);
            localStorage.setItem('searchTask', searchTask);
            localStorage.setItem('isChecked', isChecked)
            if (!localStorage.getItem('movies')) {
                setLoading(true);
                MoviesApi.getMovies()
                    .then(data => {
                        handleFilteredMovies(data, isChecked, searchTask);
                        localStorage.setItem('movies', JSON.stringify(data));
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            } else {
                handleFilteredMovies(JSON.parse(localStorage.getItem('movies')), isChecked, searchTask);
                setLoading(false);
            };
        };
    };

    function sleep(milliseconds) {
        let t = (new Date()).getTime();
        let i = 0;
        while (((new Date()).getTime() - t) < milliseconds) {
            i = i + 1;
        }
    };

    useEffect(() => {
        if (!loading) {
            const task = localStorage.getItem('searchTask');
            const movies = JSON.parse(localStorage.getItem('movies'));
            if (movies !== null) {
                handleFilteredMovies(movies, isChecked, task);
            } else {
                sleep(5000);
                const movies = JSON.parse(localStorage.getItem('movies'));
                handleFilteredMovies(movies, isChecked, task);
            }
        }
    }, [isChecked, searchTask, loading] );

    return (
        <>
            <SearchForm
                onSubmitSearch={handleSubmitSearch}
                changeCheckbox={changeCheckbox}
                isChecked={isChecked}
            />
            {loading ?
                <Preloader />
                :
                <MoviesList
                    movies={movies}
                    onSaveMovie={onSaveMovie}
                    filteredMovies={filteredMovies}
                    savedMovies={savedMovies}
                    onDeleteMovie={onDeleteMovie}
                    windowWidth={windowWidth}
                />
            }
        </>
    );

};

export default Movies;
