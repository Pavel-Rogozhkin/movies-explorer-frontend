import './App.css';
import { Switch, Route } from 'react-router-dom';
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
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import MainApi from '../../utils/MainApi';

function App() {

    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));

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

    return (
        <CurrentUserContext.Provider 
            value={currentUser}
        >
            <Header />
            <main className='main'>
                <Switch>
                    <Route exact path='/'>
                        <Main />
                    </Route>

                    <Route path='/movies'>
                        <Movies />
                    </Route>
                    
                    <Route path='/saved-movies'>
                        <SavedMovies />
                    </Route>
                    
                    <Route path='/profile'>
                        <Profile />
                    </Route>
                    
                    <Route path='/signup'>
                        <Register />
                    </Route>

                    <Route path='/signin'>
                        <Login />
                    </Route>

                    <Route
                        path='*'
                        component={NotFound}
                    >
                    </Route>
                </Switch>
            </main>
            <Footer />
        </CurrentUserContext.Provider>
    );

};

export default App;
