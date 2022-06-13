/**
 * Компонент для отображения aside
 * @component
*/

export default function Accordion(){
    return (
        <aside className="accordion">
            <a className="accordion__logo link" target="_blank" rel="noopener noreferrer" href="https://open.spotify.com">
                <img src="logo.jpg" alt="Лого" />
                <h1 className="accordion__title">Spotify</h1>
            </a>
            <nav className="menu">
                <ul className="menu__items">
                    <li> <a href="/" className="menu__item_active link">Главная</a></li>
                    <li> <a href="/" className="menu__item link">Поиск</a></li>
                    <li> <a href="/" className="menu__item link">Моя медиатека</a></li>
                    <li> <a href="/" className="menu__item link">Создать плейлист</a></li>
                </ul>
            </nav>
        </aside>
    );
}