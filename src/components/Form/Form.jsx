import Button from '../Button/Button';
import './Form.css';

function Form({
    name,
    children,
    place,
    buttonText,
    onSubmit,
    isValid
}) {

    return (
        <form
            className='form'
            name={name}
            noValidate 
            onSubmit={onSubmit}
        >
            {children}
            <Button
                place={place}
                buttonText={buttonText}
                isValid={isValid}
            />
        </form>
    );

};

export default Form;
