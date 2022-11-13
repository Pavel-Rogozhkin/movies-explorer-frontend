import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import { useState, useEffect } from "react";

function SavedMovies({
    movies,
    savedMovies,
    onDeleteMovie,
    windowWidth,
}) {

    const [filteredMovies, setFilteredMovies] = useState(savedMovies);
    const [searchTask, setSearchTask] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        localStorage.setItem('searchTask', '');
    }, [] );

    function changeCheckbox() {
        setIsChecked(!isChecked);
        localStorage.setItem('isChecked', !isChecked);
        handleFilteredMovies(filteredMovies, !isChecked, '');
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
        setSearchTask(searchTask);
        handleFilteredMovies(savedMovies, isChecked, searchTask);
    };

    // Re-render hook
    useEffect(() => {
        const task = localStorage.getItem('searchTask');
        handleFilteredMovies(movies, isChecked, task);
    }, [isChecked, searchTask] );

    return (
        <>
            <SearchForm
                onSubmitSearch={handleSubmitSearch}
                changeCheckbox={changeCheckbox}
                isChecked={isChecked}
            />
            <MoviesList
                movies={savedMovies}
                filteredMovies={filteredMovies}
                isButtonMoreUnvisible={true}
                isSaveButtonTypeDelete={true}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
                windowWidth={windowWidth}
            />
        </>
    );

};

export default SavedMovies;
