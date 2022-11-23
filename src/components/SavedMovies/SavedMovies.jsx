import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import { useState, useEffect } from "react";

function SavedMovies({
    savedMovies,
    onDeleteMovie,
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
            handleFilteredMovies(savedMovies, isChecked, searchTask);
        };
    };

    // Re-render hook
    // useEffect(() => {
    //     handleFilteredMovies(savedMovies, isChecked, searchTask);
    // }, [isChecked, searchTask, savedMovies] );

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
            />
            <MoviesList
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
