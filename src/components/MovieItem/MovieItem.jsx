import './MovieItem.css';
import { MOVIES_API_URL } from '../../utils/consts';
import { useState } from 'react';

function MovieItem({
    movie,
    movies,
    isSaveButtonTypeDelete,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
}) {

    console.log(movie);
    // const savedMovie = savedMovies.find(m => m._id === movie.id); //  Debug !!Change movies to savedMovies!! 
    const savedMovie = savedMovies.find(m => m.nameEN === movie.nameEN); //  Debug !!Change movies to savedMovies!! 
    const [isSaved, setIsSaved] = useState(false);

    function handleDeleteMovie(e) {
        e.preventDefault();
        setIsSaved(!isSaved);
        onDeleteMovie(savedMovie);
    };

    function handleSaveMovie(e) {
        e.preventDefault();
        setIsSaved(!isSaved);
        onSaveMovie(savedMovie);
    };

    return (
        <li 
            className='movie-item'
            key={movie.id}
        >
            <a
                href={movie.trailerLink}
                className="movie-item movie-item__link"
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
                    src={isSaveButtonTypeDelete ? `${movie.image}` : `${MOVIES_API_URL}${movie.image.url}`}
                    alt={movie.title || movie.nameRU}
                />
                <button
                    className={`
                        movie-item__button
                        ${isSaved ? 'movie-item__button_active' : ''}
                        movie-item__button_type_${isSaveButtonTypeDelete ? 'delete' : 'save'}
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
