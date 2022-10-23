import './Header.css';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

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
                        <Logo />
                        <Navigation />
                    </header>
                </>
            </Route>

            <Route exact path='/'>
                <>
                    <header className='header header__main-page'>
                        <Logo />
                        <Navigation
                            isPageMain={true}
                        />
                    </header>
                </>
            </Route>

        </Switch>
        
    );

};

export default Header;
