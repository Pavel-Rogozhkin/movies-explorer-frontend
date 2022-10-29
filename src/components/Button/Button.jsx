import './Button.css';

function Button({ place, buttonText }) {

    return (
        <button
            className={`button button_place_${place}`}
            aria-label={buttonText}
        >
            {buttonText}
        </button>
    );

};

export default Button;
