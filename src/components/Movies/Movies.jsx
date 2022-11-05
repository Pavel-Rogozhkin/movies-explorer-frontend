import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';

function Movies({
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
}) {

    return (
        <>
            <SearchForm />
            <MoviesList
                onSaveMovie={onSaveMovie}
            />
        </>
    );

};

export default Movies;
