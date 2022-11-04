import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesList from '../MoviesList/MoviesList';

function SavedMovies() {

    return (
        <>
            <SearchForm />
            <MoviesList 
                isButtonMoreUnvisible={true}
                isSaveButtonTypeDelete={true}
            />
        </>
    );

};

export default SavedMovies;
