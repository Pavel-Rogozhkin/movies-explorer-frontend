import './Footer.css';
import { Route } from 'react-router-dom';

function Footer() {

    const paths = [
        "/",
        "/movies",
        "/saved-movies",
    ];

    return (
        <Route exact path={paths}>
            <footer className='footer'>
                <p className="footer__text">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </p>
                <div className='footer__container'>
                    <p className='footer_copyright'>&#169; {new Date().getFullYear()} </p>
                </div>
            </footer>
        </Route>
    );
    
};

export default Footer;
