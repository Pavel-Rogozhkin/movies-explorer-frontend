import './Login.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

function Login() {

    return (
        <div className='login'>
            <Logo />
            <h2 className='login__title'>
                Рады видеть!
            </h2>
            <Form
                name='login'
                place='login'
                buttonText='Войти'
            >
                <Input 
                    place='login'
                    name='email'
                    label='E-mail'
                    type='email'
                    value='pochta@yandex.ru'
                    placeholder='E-mail'
                    errorMessage=''
                />
                <Input 
                    place='login'
                    name='password'
                    label='Пароль'
                    type='password'
                    value=''
                    placeholder='Пароль'
                    errorMessage='Что-топошло не так...'
                />
            </Form>
            <div className='login__flex'>
                <span className='login__caption login__text'>
                    Ещё не зарегистрированы?
                </span>
                <Link
                    className='login__link login__text'
                    to='/signup'
                >
                    Регистрация
                </Link>
            </div>
        </div>
    );

};

export default Login;
