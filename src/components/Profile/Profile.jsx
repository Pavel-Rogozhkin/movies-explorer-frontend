import './Profile.css';
import Input from '../Input/Input';
import Form from '../Form/Form';
import Button from '../Button/Button';

function Profile() {

    return (
        <div className='profile'>
            <h2 className='profile__welcome'>
                Привет, Павел!
            </h2>
            <Form
                name='profile'
                place='profile'
                buttonText='Редактировать'
            >
                <Input 
                    place='profile'
                    name='name'
                    label='Имя'
                    type='text'
                    value='Павел'
                    placeholder='Имя'
                    errorMessage=''
                />
                <Input 
                    place='profile'
                    name='email'
                    label='E-mail'
                    type='email'
                    value='pochta@yandex.ru'
                    placeholder='E-mail'
                    errorMessage=''
                />
            </Form>
            <Button
                place='logout'
                buttonText='Выйти из аккаунта'
            />
        </div>
    );

};

export default Profile;
