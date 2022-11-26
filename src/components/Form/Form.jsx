import Button from '../Button/Button';
import './Form.css';

function Form({
    name,
    children,
    place,
    buttonText,
    onSubmit,
    isValid,
    isSearchform,
}) {

    return (
        <form
            className='form'
            name={name}
            noValidate 
            onSubmit={onSubmit}
        >
            {children}
            <p className='form__error'>
                    {!isValid && isSearchform ?
                        'Нужно ввести ключевое слово'
                        :
                        ''
                    }
            </p>
            <Button
                place={place}
                buttonText={buttonText}
                isValid={isValid}
            />
        </form>
    );

};

export default Form;
