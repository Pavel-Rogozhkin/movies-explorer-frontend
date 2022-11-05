import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';
import { useState, useEffect } from "react";

function SavedMovies({
    savedMovies,
    onDeleteMovie,
}) {

    const [filteredMovies, setFilteredMovies] = useState(savedMovies);

    return (
        <>
            <SearchForm />
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
