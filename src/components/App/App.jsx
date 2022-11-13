import './App.css';
import { Switch, Route, useHistory, Redirect  } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import useWindowSize from '../../utils/useWindowSize';
import { MOVIES_API_URL } from '../../utils/consts';

function App() {

    // consts, states and etc:
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
    const [loading,  setLoading] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    
    const windowWidth = useWindowSize().width;

    const history = useHistory();

    // hooks:
    useEffect( () => {
        if (loggedIn) {

            setLoading(true);

            MainApi.getUserInfo()
            .then(( userProfile ) => {
                setLoggedIn(true);
                localStorage.setItem('loggedIn', true);
                setCurrentUser(userProfile);
            })
            .catch(error => {
                console.log(error);
                setLoggedIn(false);
                setCurrentUser({});
                localStorage.clear();
            });

            MainApi.getSavedMovies()
            .then(data => {
                setSavedMovies(data)
            })
            .catch(error => {
                console.log(error);
            });

            MoviesApi.getMovies()
                .then(data => {
                    localStorage.setItem('movies', JSON.stringify(data));
                    setMovies(data);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });

        }
    }, [loggedIn] );

    // functions:
    function handleSetUserInfo(data) {
        setLoading(true);
        MainApi.setUserInfo(data)
            .then(user => {
                setCurrentUser(user);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    function handleSingOut() {
        MainApi.signOut()
            .then(() => {
                setLoggedIn(false);
                setCurrentUser({});
                localStorage.clear();
                history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    function saveMovie(movie) {
        console.log(savedMovies);
        let movieOUT = {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            trailerLink: movie.trailerLink,
            movieId: movie.id,
            image: `${MOVIES_API_URL}${movie.image.url}`,
            thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        };
        MainApi.setSavedMovies(movieOUT)
            .then(i => {
                setSavedMovies([ i, ...savedMovies ]);
                localStorage.setItem('savedMovies', [ i, ...savedMovies ]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    function deleteMovie(movie) {
        MainApi.deleteMovie(movie.movieId)
            .then(() => {
                const moviesList = savedMovies.filter((m) => m.movieId !== movie.movieId);
                setSavedMovies(moviesList);
            })
            .catch(error => {
                console.log(error);
            });
    };

    function handleRegister({ name, email, password}) {
        setLoading(true);
        MainApi.register({ name, email, password })
            .then(() => {
                handleAuth({
                    name,
                    email,
                    password,
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    function handleAuth({ email, password }) {
        setLoading(true);
        MainApi.auth({ email, password })
            .then(res => {
                setCurrentUser({
                    name: res.name,
                    email: res.email,
                });
                setLoggedIn(true);
                localStorage.setItem('loggedIn', true);
                history.push('/movies');
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // render:
    return (
        <CurrentUserContext.Provider 
            value={currentUser}
        >
            <Header 
                loggedIn={loggedIn}
            />
            <main className='main'>
                <Switch>

                    <Route exact path='/'>
                        <Main />
                    </Route>

                    <ProtectedRoute
                        exact
                        path='/movies'
                        component={Movies}
                        loggedIn={loggedIn}
                        movies={movies}
                        savedMovies={savedMovies}
                        onSaveMovie={saveMovie}
                        onDeleteMovie={deleteMovie}
                        loading={loading}
                        setLoading={setLoading}
                        windowWidth={windowWidth}
                    />

                    <ProtectedRoute
                        exact
                        path='/saved-movies'
                        component={SavedMovies}
                        movies={movies}
                        loggedIn={loggedIn}
                        savedMovies={savedMovies}
                        onDeleteMovie={deleteMovie}
                        windowWidth={windowWidth}
                    />

                    <ProtectedRoute
                        exact
                        path='/profile'
                        component={Profile}
                        loggedIn={loggedIn}
                        loading={loading}
                        onSetUserInfo={handleSetUserInfo}
                        onSignOut={handleSingOut}
                    />

                    <Route path='/signup'>
                        {loggedIn ?
                            <Redirect to='/movies' />
                            :
                            <Register
                                onRegister={handleRegister}
                                loading={loading}
                            />
                        }
                    </Route>

                    <Route path='/signin'>
                        {loggedIn ?
                            <Redirect to='/movies' />
                            :
                            <Login
                                onLogin={handleAuth}
                                loading={loading}
                            />
                        }
                    </Route>

                    <Route
                        path='*'
                        component={NotFound}
                    />

                    <Route>
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                    </Route>

                </Switch>
            </main>
            <Footer />
        </CurrentUserContext.Provider>
    );

};

export default App;
