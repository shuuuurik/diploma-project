import { Playlist } from './playlist.js';
import { IPlaylist } from "./interfaces.js";

interface IPlaylistSection {
    add(playlistItem: IPlaylist, isMy: boolean): void;
}

export class PlaylistSection implements IPlaylistSection{
    container: HTMLElement;

    /**
     * Конструктор для создания секции плейлистов
     * @constructor
     * @param {HTMLElement} container - HTML-тег, который будет служить секцией для плейлистов
     */
    constructor(container: HTMLElement) {
        this.container = container;
    }

    /**
     * Метод, добавляющий плейлист в секцию плейлистов
     * @param {IPlaylist} playlistItem - Интерфейс плейлиста, на основе которого создается плейлист
     * @param {boolean} isSaved - Флаговая переменная, обозначающая, сохранен ли данный плейлист в медиатеке пользователя (иначе он найден)
     */
    add(playlistItem: IPlaylist, isSaved: boolean): void{
        const myPlaylist = new Playlist(playlistItem);
        const template = isSaved ? Playlist.templateSaved(myPlaylist) : Playlist.templateFound(myPlaylist);
        this.container.insertAdjacentHTML('beforeend', template);
    }

    /**
     * Метод, добавляющий в HTML-разметку секции плейлистов сообщение о том, что по запросу ничего не найдено
     */
    nothingWasFound(){
        const template: string = '<h3 class="section__subtitle">По данному запросу ничего не найдено</h3>'
        this.container.insertAdjacentHTML('beforeend', template);
    }

    /**
     * Метод, очищающий HTML-разметку секции плейлистов 
     */
    clearHtml(): void {
        this.container.innerHTML = '';
    }
}