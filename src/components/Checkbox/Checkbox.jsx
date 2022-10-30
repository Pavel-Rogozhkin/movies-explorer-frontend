import './Checkbox.css';
import { useState } from 'react';

function Checkbox() {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='checkbox__container'>
            <input
                className='checkbox'
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckbox}
                id='shortMoviesFilter'
            />
            <label
                className='checkbox__label'
                for='shortMoviesFilter'
            />
            <p className='checkbox__text'>
                Короткометражки
            </p>
        </div>
    );

};

export default Checkbox;
