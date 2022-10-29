import './Form.css';

function Form({ name, children }) {

    return (
        <form
            className='form'
            name={name}
        >
            {children}
        </form>
    );

};

export default Form;
