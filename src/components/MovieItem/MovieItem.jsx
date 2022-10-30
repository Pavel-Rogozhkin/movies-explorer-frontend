import './MovieItem.css';

function MovieItem({ movie }) {

    console.log(movie.img);

    return (
        <li 
            className='movie-item'
        >
            <div className='movie-item__info'>
                <h3 className='movie-item__title'>
                    {movie.title}
                </h3>
                <p className='movie-item__duration'>
                    {movie.duration}
                </p>
            </div>
            <img
                className='movie-item__img'
                src={movie.img}
                alt={movie.title}
            />
            <button className='movie-item__button_type_save'>
                Сохранить
            </button>
        </li>
    );

};

export default MovieItem;
