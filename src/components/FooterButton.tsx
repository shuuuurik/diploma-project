/**
 * Компонент для отображения кнопки в footer
 * @component
 * @param {string} props.data - Источник изображения (svg)
 * @param {string} props.description - Текст для атрибута aria-label
 * @param {string} props.class - Название класса для кнопки
*/
export default function FooterButton(props: {
    data: string;
    description: string;
    class: string;
}){
    return (
        <button 
            type="button" 
            className={props.class} 
            aria-label={props.description}>
            
            <object 
                type="image/svg+xml" 
                data={props.data} 
                aria-label={props.description}>
            </object> 
        </button>
    );
}