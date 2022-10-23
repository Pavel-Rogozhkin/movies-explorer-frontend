import './Header.css';
import { Switch, Route, Link } from 'react-router-dom';
// import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg'

function Header() {

    const paths = [
        '/movies',
        '/saved-movies',
        '/profile',
    ];

    return (
        <Switch>
            <Route path={paths}>
                <>
                    <header className='header'>
                        <Link to="/">
                            <img
                                className="logo"
                                src={logo}
                                alt="Логотип"
                            />
                        </Link>
                        {/* <Navigation /> */}
                    </header>
                </>
            </Route>
            <Route exact path='/'>
                <>
                    <header className='header header__main-page'>
                        <Link to="/">
                            <img
                                className="logo"
                                src={logo}
                                alt="Логотип"
                            />
                        </Link>
                        {/* <Navigation
                            isPageMain={true}
                        /> */}
                    </header>
                </>
            </Route>
        </Switch>
    );

};

export default Header;
