import './Menu.css';
import MenuItem from '../MenuItem/MenuItem';

function Menu({ isClicked }) {

    return (
        <nav className='menu'>
            <div className={`${isClicked && 'menu__overlay'}`}>
                <ul className={`menu__list ${isClicked && 'menu__list_visible'}`}>
                    <MenuItem
                        exact='exact'
                        to='/'
                        linkText='Главная'
                        isProfile={false}
                    />
                    <MenuItem
                        to='/movies'
                        linkText='Фильмы'
                        isProfile={false}
                    />
                    <MenuItem
                        to='/saved-movies'
                        linkText='Сохранённые фильмы'
                        isProfile={false}
                    />
                    <MenuItem
                        isProfile={true}
                    />
                </ul>
            </div>
        </nav>
    );

};

export default Menu;
