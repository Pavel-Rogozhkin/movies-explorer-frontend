import './MoviesList.css';
import MoviesSet from '../MoviesSet/MoviesSet';

function MoviesList() {

    return (
        <div className='movies-list__container'>
            <ul className='movies-list'>
                <MoviesSet />
            </ul>
            <button className='movies-list__more'>
                Ещё
            </button>
        </div>
    );

};

export default MoviesList;
