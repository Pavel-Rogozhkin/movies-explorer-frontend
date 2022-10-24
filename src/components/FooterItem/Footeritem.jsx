import './FooterItem.css';

function FooterItem({ link, text }) {

    return (
        <li>
            <a
                href={link}
                className="footer__link"
                target="_blank"
                rel="noreferrer"
            >
                {text}
            </a>
        </li>
    );
};

export default FooterItem;
