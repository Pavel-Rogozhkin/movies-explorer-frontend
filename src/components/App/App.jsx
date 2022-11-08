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

function App() {

    // consts, states and etc:
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
    const [loading,  setLoading] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);

    const history = useHistory();

    // hooks:
    useEffect( () => {
        if (loggedIn) {

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

            setLoading(true);
            MoviesApi.getMovies()
                .then(data => {
                    localStorage.setItem('movies', JSON.stringify(data));
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });

            MainApi.getSavedMovies()
            .then(data => {
                setSavedMovies(data)
            })
            .catch(error => {
                console.log(error);
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

    function saveMovie({ array, id }) {
        console.log(array);
        const movie = array.find(m => m.movieId === id);
        MainApi.setSavedMovies(movie)
            .then(i => {
                setSavedMovies([ i, ...savedMovies ]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    function deleteMovie(movie) {
        MainApi.deleteMovie(movie._id)
            .then(() => {
                const moviesList = savedMovies.filter((m) => m._id !== movie._id);
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
                        savedMovies={savedMovies}
                        onSaveMovie={saveMovie}
                        onDeleteMovie={deleteMovie}
                        loading={loading}
                        setLoading={setLoading}
                    />

                    <ProtectedRoute
                        exact
                        path='/saved-movies'
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        savedMovies={savedMovies}
                        onDeleteMovie={deleteMovie}
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
