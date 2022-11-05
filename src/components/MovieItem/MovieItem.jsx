import './MovieItem.css';
import { MOVIES_API_URL } from '../../utils/consts';

function MovieItem({
    movie,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
}) {

    const savedMovie = savedMovies.find(m => m.movieId === movie._id);
    const isSaved = movie._id && savedMovie;

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
        >
            <a
                href={movie.trailerLink}
                className="movie-item__link"
                target="blank"
            >
                <div className='movie-item__info'>
                    <h3 className='movie-item__title'>
                        {movie.nameRU ? movie.nameRU : movie.title}
                    </h3>
                    <p className='movie-item__duration'>
                        {`${movie.duration} минут`}
                    </p>
                </div>
                <img
                    className='movie-item__img'
                    src={movie.image.url ?
                        `${MOVIES_API_URL}${movie.image.url}`
                        : 
                        movie.img
                    }
                    alt={movie.nameRU ? movie.nameRU : movie.title}
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
