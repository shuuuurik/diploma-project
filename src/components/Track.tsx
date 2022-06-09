import { useContext } from "react";
import { CurrentTrackContext } from "../currentTrackContext";
import { ITrack } from "../interfaces";

/**
 * Компонент для отображения трека
 * @component
 * @param {ITrack} props.track - Трек, лежащий в основе компонента
 * @param {boolean} props.isCurrent - Флаговая переменная, обозначающая, является ли трек текущим (отображаемый в footer)
*/
export default function Track(props: {
    track: ITrack;
    isCurrent: boolean;
}){
    const {changeTrack} = useContext(CurrentTrackContext);

    /**
     * Метод, обрезающий входную строку, если ее длина превышает заданное значение 
     * @param {string} text - Входная строка
     * @param {number} size - Максимальная длина
     * @returns {string} Отформатированная строка
     */
    const resize = (text: string, size: number): string => 
        text.length <= size 
            ? text 
            : text.substr(0, size) + " ...";

    return (
        <div className={props.isCurrent ? "current-track" : "track"}>
            <img 
                src={props.track.image} 
                alt="Трек" 
                className={props.isCurrent ? "current-track__icon" : "track__icon"} 
                onClick={() => changeTrack(props.track)}
            />
            <div className="track__info">
                <div className="track__name">{resize(props.track.name, 30)}</div>
                <div className="track__artist">{resize(props.track.artist, 30)}</div>
            </div>
            {!props.isCurrent && props.track.time &&
                <div className="track__time">{props.track.time}</div>
            }
            
        </div>
    );
}