/**
 * Компонент для отображения header
 * @component
 * @param {string} props.searchValue - Содержимое поля input
 * @param {(value: string) => void} props.onSearchCallback - Коллбэк, переданный из компонента App для изменения своего 
 * состояния searchValue (фактически это setSearchValue из компонента App)
*/
export default function Header(props: {
    searchValue: string,
    onSearchCallback: (value: string) => void
}) {
    return (
        <header className="header">
                <input 
                    value={props.searchValue}
                    onChange={(e) => props.onSearchCallback(e.target.value)}
                    className="header__search" 
                    type="search" 
                    placeholder="Название плейлиста" 
                />
            <h2 className="header__user" >Александр</h2>
        </header>
    );
}
