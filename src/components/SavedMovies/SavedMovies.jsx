import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import { useState, useEffect } from "react";

function SavedMovies({
    savedMovies,
    onDeleteMovie,
    windowWidth,
}) {

    const [filteredSavedMovies, setFilteredSavedMovies] = useState(savedMovies);
    const [searchTask, setSearchTask] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function changeCheckbox() {
        setIsChecked(!isChecked);
        localStorage.setItem('isChecked', !isChecked);
    };

    function handleFilteredMovies(movies, isChecked, task) {
        const moviesToFilter = movies.filter(m => m.nameRU.toLowerCase().includes(task.toLowerCase()) || m.nameEN.toLowerCase().includes(task.toLowerCase()));
        setFilteredSavedMovies(isChecked ?
            moviesToFilter.filter(m => m.duration < 40)
            :
            moviesToFilter
        );
    };

    function handleSubmitSearch(searchTask) {
        if (searchTask) {
            console.log('searching............');
            setErrorMessage(' ');
            setSearchTask(searchTask);
            localStorage.setItem('searchTask', searchTask);
            localStorage.setItem('isChecked', isChecked);
            handleFilteredMovies(savedMovies, isChecked, searchTask);
        } else {
            console.log(' nothint to search!');
            setErrorMessage('Нужно ввести ключевое слово');
        };
    };

    // Re-render hook
    useEffect(() => {
        const task = localStorage.getItem('searchTask');
        handleFilteredMovies(savedMovies, isChecked, task);
    }, [isChecked, searchTask, savedMovies] );

    useEffect(() => {
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
                isPageSave={true}
                errorMessage={errorMessage}
            />
            <MoviesList
                filteredMovies={filteredSavedMovies}
                isButtonMoreUnvisible={true}
                isSaveButtonTypeDelete={true}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
                windowWidth={windowWidth}
                errorMessage={errorMessage}
            />
        </>
    );

};

export default SavedMovies;
