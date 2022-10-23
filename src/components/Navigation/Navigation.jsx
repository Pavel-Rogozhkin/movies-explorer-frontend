import './Navigation.css';
// import { useState } from 'react';
import AuthNav from '../AuthNav/AuthNav';
// import Burger from '../BurgerBtn/Burger';
// import Menu from '../NavMenu/Menu';

function Navigation({ isPageMain }) {

    const loggedIn = false;
    // const [onClick, setOnClick] = useState(false);
    
    // const handleMenuClick = () => {
    //     setOnClick(!onClick);
    // };

    return (
        <nav className={`navigation ${(isPageMain && !loggedIn) && 'navigation__main-page'}`}>
            {(loggedIn || isPageMain) ? (
                <AuthNav />
            ) : (
                <>
                    {/* <Menu
                        isPageMain={isPageMain}
                        onClick={onClick}
                    />
                    <Burger
                        isPageMain={isPageMain}
                        onClick={onClick}
                        onMenuClick={handleMenuClick}
                    /> */}
                </>
            )}
        </nav>
    );

};

export default Navigation;
