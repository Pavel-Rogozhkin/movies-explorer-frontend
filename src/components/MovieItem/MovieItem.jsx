import './MovieItem.css';
import { MOVIES_API_URL } from '../../utils/consts';

function MovieItem({
    key,
    movie,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
}) {

    const savedMovie = savedMovies.find(m => m.id === movie.id);
    const isSaved = movie.id && savedMovie;

    function handleDeleteMovie(e) {
        e.preventDefault();
        onDeleteMovie(savedMovie);
    };

    function handleSaveMovie(e) {
        e.preventDefault();
        onSaveMovie(movie);
    };

    return (
        <li 
            className='movie-item'
            key={movie.id}
        >
            <a
                href={movie.trailerLink}
                className="movie-item__link"
                target="blank"
            >
                <div className='movie-item__info'>
                    <h3 className='movie-item__title'>
                        {movie.title || movie.nameRU}
                    </h3>
                    <p className='movie-item__duration'>
                        {`${movie.duration} минут`}
                    </p>
                </div>
                <img
                    className='movie-item__img'
                    src={movie.img || `${MOVIES_API_URL}${movie.image.url}`}
                    alt={movie.title || movie.nameRU}
                />
                <button
                    className={`
                        movie-item__button
                        movie-item__button_type_${isSaveButtonTypeDelete ? 'delete' : 'save'}
                        ${isSaved ? 'movie-item__button_active' : ''}
                    `}
                    type='button'
                    onClick={isSaved || isSaveButtonTypeDelete ? handleDeleteMovie : handleSaveMovie}
                >
                    Сохранить
                </button>
            </a>
        </li>
    );

};

export default MovieItem;
