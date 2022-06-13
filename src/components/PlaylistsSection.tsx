import { ReactElement } from "react";

/**
 * Компонент для отображения секции плейлистов
 * @component
 * @param {string} props.sectionClassName - Название класса для кнопки
 * @param {string} props.sectionTitle - Название секции
 * @param {ReactElement} props.children - Содержимое секции
*/
export default function PlaylistsSection(props: {
    sectionClassName: string;
    sectionTitle: string;
    children: ReactElement
}) { 

    return (
        <section className={props.sectionClassName}>
            <div className="section">
                <h2 className="section__title">{props.sectionTitle}</h2>
                <section className="section__row">
                    {props.children}
                </section>
            </div>
        </section>
    );
}