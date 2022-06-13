import { IPlaylist } from "../interfaces";

/**
 * Компонент для отображения плейлиста (без кнопок)
 * @component
 * @param {IPlaylist} props.playlist - Плейлист, лежащий в основе компонента
*/
export default function PlaylistWithoutButton(props: {
    playlist: IPlaylist
}) { 

    return (
        <article className="section__column">
            <div className="item-about">
                <img 
                    src={props.playlist.image} 
                    alt="Плейлист" 
                    height="150" 
                    width="150" />
                <div 
                    className="item-about__title"
                >{props.playlist.name}</div>
                <div 
                    className="item-about__text"
                >{props.playlist.author}</div>
            </div>
        </article>
    );
}