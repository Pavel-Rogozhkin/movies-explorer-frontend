import './Burger.css';

const Burger = ({ isClicked, onMenuClick }) => {
    return (
        <button
            type="button"
            className={`burger ${isClicked && 'burger__close'}`}
            onClick={onMenuClick}
            aria-label="Меню навигации по сайту"
        >
        </button>
    );
};

export default Burger;
