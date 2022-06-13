import { useContext } from "react";
import { CurrentTrackContext } from "../currentTrackContext";
import { ITrack } from "../interfaces";
import { resize } from "../utils/functions";

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