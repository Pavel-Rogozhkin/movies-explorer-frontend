import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from "react";
import MoviesApi from '../../utils/MoviesApi';

function Movies({
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

    function changeCheckbox() {
        setIsChecked(!isChecked);
        localStorage.setItem('isChecked', !isChecked);
    };

    function handleFilteredMovies(movies, isChecked, task) {
        const moviesToFilter = movies.filter(m => m.nameRU.toLowerCase().includes(task.toLowerCase()) || m.nameEN.toLowerCase().includes(task.toLowerCase()));
        setFilteredMovies(isChecked ? 
            moviesToFilter.filter(m => m.duration < 40)
            :
            moviesToFilter
        );
        localStorage.setItem('filteredMovies', JSON.stringify(isChecked ? 
            moviesToFilter.filter(m => m.duration < 40)
            :
            moviesToFilter
        ));
    };

    function handleSubmitSearch(searchTask) {
        if (searchTask) {
            setSearchTask(searchTask);
            localStorage.setItem('searchTask', searchTask);
            localStorage.setItem('isChecked', isChecked);
            if (!localStorage.getItem('movies')) {
                setLoading(true);
                MoviesApi.getMovies()
                    .then(data => {
                        handleFilteredMovies(data, isChecked, searchTask);
                        localStorage.setItem('movies', JSON.stringify(data));
                        localStorage.setItem('filteredMovies', JSON.stringify(data));
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

    // Re-render hook
    useEffect(() => {
        const task = localStorage.getItem('searchTask');
        const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
        if (task && filteredMovies) {
            handleFilteredMovies(filteredMovies, isChecked, task);
        };
    }, [isChecked, searchTask] );

    useEffect(() => {
        if (localStorage.getItem('filteredMovies')) {
            setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
        };
        if (localStorage.getItem('isChecked') === 'true') {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        };
        if (localStorage.getItem('searchTask')) {
            setSearchTask(localStorage.getItem('searchTask'));
        };
    }, [] );

    return (
        <>
            <SearchForm
                onSubmitSearch={handleSubmitSearch}
                changeCheckbox={changeCheckbox}
                isChecked={isChecked}
                isPageSave={false}
            />
            {loading ?
                <Preloader />
                :
                <MoviesList
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
