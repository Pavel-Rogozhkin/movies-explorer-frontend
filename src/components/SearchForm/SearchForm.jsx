import './SearchForm.css';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import useFormAndValidation from '../../utils/useFormWithValidation';
import { useEffect } from 'react';

function SearchForm({
    onSubmitSearch,
    changeCheckbox,
    isChecked,
}) {

    const {
        values,
        setValues,
        handleChange,
        errors,
    } = useFormAndValidation();

    useEffect(() => {
        const task = localStorage.getItem('searchTask');
        if (task) {
            setValues({task});
        };
    }, [setValues] );

    function handleSubmitSearch(e) {
        e.preventDefault();
        onSubmitSearch(values)
    };

    return (
        <section className='search'>
            <div className='search__container'>
                <Form
                    place='search'
                    buttonText='Поиск'
                    onSubmit={handleSubmitSearch}
                >
                    <Input
                        type="text"
                        name="search"
                        place="search"
                        placeholder="Фильм"
                        errorMessage={errors.name}
                        onChange={handleChange}
                    />
                </Form>
                <Checkbox
                    changeCheckbox={changeCheckbox}
                    isChecked={isChecked}
                />
            </div>
        </section>
    );

};

export default SearchForm;
