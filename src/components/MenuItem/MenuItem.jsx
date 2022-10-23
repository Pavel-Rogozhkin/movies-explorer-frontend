import './MenuItem.css';
import { NavLink, Link } from 'react-router-dom';

function MenuItem({ exact, to, linkText, isProfile }) {

    return(
        <li className='menu__item'>
            {isProfile ?
                <Link
                    to='/profile'
                    className='menu__profile'
                >
                    Аккаунт
                </Link>
                :
                <NavLink
                    exact={exact}
                    to={to}
                    className='menu__link'
                    activeClassName='menu__link_active'
                >
                    {linkText}
                </NavLink>
            }
        </li>
    );

};

export default MenuItem;
