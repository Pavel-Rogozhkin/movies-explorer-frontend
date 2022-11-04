import Button from '../Button/Button';
import './Form.css';

function Form({ name, children, place, buttonText }) {

    return (
        <form
            className='form'
            name={name}
        >
            {children}
            <Button
                place={place}
                buttonText={buttonText}
            />
        </form>
    );

};

export default Form;
