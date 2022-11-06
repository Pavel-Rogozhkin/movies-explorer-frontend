import './Button.css';

function Button({ place, buttonText, isValid, type }) {

    return (
        <button
            className={`button button_place_${place} ${(isValid || (place === 'search')) ? '' : 'button_disabled'}`}
            aria-label={buttonText}
            type={type || 'submit'}
            disabled={!isValid}
        >
            {buttonText}
        </button>
    );

};

export default Button;
