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
    setLoading
}) {

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTask, setSearchTask] = useState('');
    const [isChecked, setIsChecked] = useState(localStorage.getItem('isChecked') === 'true');

    function changeCheckbox() {
        setIsChecked(!isChecked);
        localStorage.setItem('isChecked', !isChecked);
    };

    function handleFilteredMovies(movies, isChecked, task) {
        const moviesToFilter = movies.filter(m => m.nameRU.toLowerCase().includes(task.toLowerCase()));
        setFilteredMovies(isChecked ?
            moviesToFilter.filter(m => m.duration < 40)
            :
            moviesToFilter    
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
                console.log(localStorage.getItem('movies'));
                handleFilteredMovies(JSON.parse(localStorage.getItem('movies')), isChecked, searchTask);
                setLoading(false);
            };
        };
    };

    useEffect(() => {
        const task = localStorage.getItem('searchTask');
        const movies = JSON.parse(localStorage.getItem('movies'));
        console.log(task);
        if (task && movies) {
            handleFilteredMovies(movies, isChecked, task);
        };
    }, [isChecked, searchTask] );

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
                    onSaveMovie={onSaveMovie}
                    filteredMovies={filteredMovies}
                    savedMovies={savedMovies}
                    onDeleteMovie={onDeleteMovie}
                />
            }
        </>
    );

};

export default Movies;
