import './MoviesList.css';
import moviesArray from '../../utils/moviesArray';
import MovieItem from '../MovieItem/MovieItem';

function MoviesList() {

    console.log(moviesArray.length);

    return (
        <section className='movies-list__container'>
            <ul className='movies-list'>
                {moviesArray.map(movie => (
                    <MovieItem
                        key={movie._id}
                        movie={movie}
                    />
                ))}
            </ul>
            <button className='movies-list__more'>
                Ещё
            </button>
        </section>
    );

};

export default MoviesList;
