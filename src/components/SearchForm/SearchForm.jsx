import './SearchForm.css';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import useFormWithValidation from '../../utils/useFormWithValidation';
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
        isValid,
    } = useFormWithValidation();

    // useEffect(() => {
    //     const task = localStorage.getItem('searchTask');
    //     if (task) {
    //         setValues({ task });
    //     };
    // }, [values] );

    // useEffect(() => {
    //     if (values) {
    //         localStorage.setItem('searchTask', values);
    //         setValues(values);
    //     }
    // }, [values] );

    function handleSubmitSearch(e) {
        e.preventDefault();
        console.log(values.search);
        onSubmitSearch(values.search);
    };

    return (
        <section className='search'>
            <div className='search__container'>
                <Form
                    place='search'
                    buttonText='Поиск'
                    onSubmit={handleSubmitSearch}
                    isValid={isValid}
                >
                    <Input
                        type="text"
                        name="search"
                        place="search"
                        placeholder="Фильм"
                        value={values.search || ''}
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
