import './SearchForm.css';
import Form from '../Form/Form';

function SearchForm() {

    return (
        <section className='search'>
            <div className='search__container'>
            <Form
                place='search'
                buttonText='Поиск'
            >
            </Form>
            </div>
        </section>
    );

};

export default SearchForm;
