import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';

function App() {
    return (
        <>
            <div className='bg-color'>

                <Header />

                <Routes>

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
                    
                    <Route path='/signin'>
                        <Login />
                    </Route>
                    
                    <Route path='/signup'>
                        <Register />
                    </Route>

                </Routes>

                <Footer />

            </div>
        </>
    );
};

export default App;
