import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import { useState, useEffect } from "react";

function SavedMovies({
    savedMovies,
    onDeleteMovie,
}) {

    const [filteredMovies, setFilteredMovies] = useState(savedMovies);
    const [searchTask, setSearchTask] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        handleFilteredMovies(savedMovies, isChecked, searchTask);
    }, [savedMovies, isChecked, searchTask]);

    function changeCheckbox() {
        setIsChecked(!isChecked);
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
        setSearchTask(searchTask);
        handleFilteredMovies(savedMovies, isChecked, searchTask);
    };

    return (
        <>
            <SearchForm
                onSubmitSearch={handleSubmitSearch}
                changeCheckbox={changeCheckbox}
                isChecked={isChecked}
            />
            <MoviesList
                filteredMovies={filteredMovies}
                isButtonMoreUnvisible={true}
                isSaveButtonTypeDelete={true}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
            />
        </>
    );

};

export default SavedMovies;
