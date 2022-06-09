import { IPlaylist } from "../interfaces";
import Api from '../utils/api';

/**
 * Компонент для отображения плейлиста с кнопкой "Добавить" или "Удалить"
 * @component
 * @param {IPlaylist} props.playlist - Плейлист, лежащий в основе компонента
 * @param {boolean} props.isSaved - Флаговая переменная, определяющая тип кнопки 
 * (сохранен ли данный плейлист в медиатеке пользователя или он был найден)
 * @param {string} props.token - Токен доступа для запросов к серверу
 * @param {(value: IPlaylist[]) => void} props.onSavedPlaylistsCallback - Коллбэк, переданный из компонента Content 
 * для изменения своего состояния savedPlaylists (фактически это setSavedPlaylists из компонента Content)
*/
export default function PlaylistWithButton(props: {
    playlist: IPlaylist,
    isSaved: boolean,
    token: string,
    onSavedPlaylistsCallback: (value: IPlaylist[]) => void
}) {

    /**
     * Метод, обрезающий входную строку, если ее длина превышает заданное значение 
     * (выбрасывает ошибку или извлекает данные треков)
     * @param {string} text - Входная строка
     * @param {number} size - Максимальная длина
     * @returns {string} Отформатированная строка
     */
    const resize = (text: string, size: number): string => 
        text.length <= size 
            ? text 
            : text.substr(0, size-3) + " ...";
        
    const buttonTemplate = props.isSaved 
        ? (
            <button 
                type="button" 
                className="item-about__action item-about__type_delete"
                onClick={() => interactWithPlaylist(props.playlist.id, 'follow')}
            >Удалить</button>)
        : (
            <button 
                type="button" 
                className="item-about__action item-about__type_add"
                onClick={() => interactWithPlaylist(props.playlist.id, 'unfollow')}
            >Добавить</button>
        )

    const interactWithPlaylist = async (id: string, operation: string) => {
        if (operation === 'follow')
            await Api.followPlaylist(props.token, id);
        else
            await Api.unfollowPlaylist(props.token, id);
        Api.getMyPlaylists(props.token).then((playlists: void|IPlaylist[]) => {
            if (playlists){
                props.onSavedPlaylistsCallback(playlists);
            }
        });
    }    

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
                >{resize(props.playlist.name, 17)}</div>
                <div 
                    className="item-about__text"
                >{resize("Автор: "+props.playlist.name, 21)}</div>
                {buttonTemplate}
            </div>
        </article>
    );
}