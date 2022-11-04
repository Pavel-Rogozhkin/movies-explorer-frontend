import './SearchForm.css';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm() {

    return (
        <section className='search'>
            <div className='search__container'>
                <Form
                    place='search'
                    buttonText='Поиск'
                >
                    <Input
                        type="text"
                        name="search"
                        place="search"
                        placeholder="Фильм"
                        errorMessage='Ничего не найдено'
                    />
                </Form>
                <Checkbox />
            </div>
        </section>
    );

};

export default SearchForm;
