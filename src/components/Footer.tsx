import FooterButton from "./FooterButton";
import Track from "./Track";
import { useContext } from "react";
import { CurrentTrackContext } from "../currentTrackContext";

/**
 * Компонент для отображения footer
 * @component
*/
export default function Footer() {
    const {track} = useContext(CurrentTrackContext);
    return (
        <footer className="footer">
            <Track 
                track={track} 
                isCurrent={true}/>
            <div className="player-controls">
                <FooterButton 
                    description="Перемешивать" 
                    data="footer/mix.svg"
                    class="player-controls__button"/>
                <FooterButton 
                    description="Назад" 
                    data="footer/back.svg"
                    class="player-controls__button"/>
                <FooterButton 
                    description="Слушать" 
                    data="footer/play.svg"
                    class="player-controls__play"/>
                <FooterButton 
                    description="Далее" 
                    data="footer/forward.svg"
                    class="player-controls__button"/>
                <FooterButton 
                    description="Повторять" 
                    data="footer/repeat.svg"
                    class="player-controls__button"/>
            </div>
            <div className="volume-bar">
                <FooterButton 
                    description="Выключить звук" 
                    data="footer/volume.svg"
                    class="player-controls__button"/>
                <div>
                    <label className="hidden-visually">
                        <input type="range" min="0" max="1" step="0.1" defaultValue="0.5" />
                    </label>
                </div>
            </div>
        </footer>
    );
}