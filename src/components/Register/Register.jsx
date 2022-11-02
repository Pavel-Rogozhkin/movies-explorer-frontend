import './Register.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

function Register() {

    return (
        <div className='register'>
            <Logo />
            <h2 className='register__title'>
                Добро пожаловать!
            </h2>
            <Form
                name='register'
                place='register'
                buttonText='Зарегистрироваться'
            >
                <Input 
                    place='register'
                    name='name'
                    label='Имя'
                    type='text'
                    value='Павел'
                    placeholder='Имя'
                    errorMessage=''
                />
                <Input 
                    place='register'
                    name='email'
                    label='E-mail'
                    type='email'
                    value='pochta@yandex.ru'
                    placeholder='E-mail'
                    errorMessage=''
                />
                <Input 
                    place='register'
                    name='password'
                    label='Пароль'
                    type='password'
                    value='4324234234'
                    placeholder='Пароль'
                    errorMessage='Что-топошло не так...'
                />
            </Form>
            <div className='register__flex'>
                <span className='register__caption register__text'>
                    Уже зарегистрированы?
                </span>
                <Link
                    className='register__link register__text'
                    to='/signin'
                >
                    Войти
                </Link>
            </div>
        </div>
    );

};

export default Register;
