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
        MainApi.getUserInfo()
        .then(( userProfile ) => {
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);
            setCurrentUser(userProfile);
        })
        .catch( (err) => {
            console.log(err);
            setLoggedIn(false);
            setCurrentUser({});
            localStorage.clear();
        });
    }, [] );

    useEffect( () => {
        if (loggedIn) {
            MainApi.getSavedMovies()
                .then(data => {
                    setSavedMovies(data)
                })
                .catch(error => {
                    console.log(error);
                })
        };
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
        const movie = array.find(movie => movie.movieId === id);
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
                        <Register />
                    </Route>

                    <Route path='/signin'>
                        <Login />
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
