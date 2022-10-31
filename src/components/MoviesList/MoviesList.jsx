import './MoviesList.css';
import moviesArray from '../../utils/moviesArray';
import MovieItem from '../MovieItem/MovieItem';

function MoviesList({ isButtonMoreUnvisible, isSaveButtonTypeDelete }) {

    console.log(moviesArray.length);

    return (
        <section className='movies-list__container'>
            <ul className='movies-list'>
                {moviesArray.map(movie => (
                    <MovieItem
                        key={movie._id}
                        movie={movie}
                        isSaveButtonTypeDelete={isSaveButtonTypeDelete}
                    />
                ))}
            </ul>
            <button className={`movies-list__more ${isButtonMoreUnvisible ? 'movies-list__more_unvisible' : ''}`}>
                Ещё
            </button>
        </section>
    );

};

export default MoviesList;
