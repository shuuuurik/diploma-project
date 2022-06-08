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
    const name: string = 
    props.track.name.length <= 30 
        ? props.track.name 
        : props.track.name.substr(0, 30) + " ...";

    const artist: string = 
    props.track.artist.length <= 30 
        ? props.track.artist 
        : props.track.artist.substr(0, 30) + " ...";

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
                <div className="track__name">{name}</div>
                <div className="track__artist">{artist}</div>
            </div>
            {!props.isCurrent && props.track.time &&
                <div className="track__time">{props.track.time}</div>
            }
            
        </div>
    );
}