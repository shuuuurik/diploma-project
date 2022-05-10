import { Playlist } from './playlist.js';
export class PlaylistSection {
    /**
     * Конструктор для создания секции плейлистов
     * @constructor
     * @param {HTMLElement} container - HTML-тег, который будет служить секцией для плейлистов
     */
    constructor(container) {
        this.container = container;
    }
    /**
     * Метод, добавляющий плейлист в секцию плейлистов
     * @param {IPlaylist} playlistItem - Интерфейс плейлиста, на основе которого создается плейлист
     * @param {boolean} isMy - Флаговая переменная, обозначающая, сохранен ли данный плейлист в медиатеке пользователя (иначе он найден)
     */
    add(playlistItem, isMy) {
        const myPlaylist = new Playlist(playlistItem);
        let template;
        if (isMy) {
            template = Playlist.templateMy(myPlaylist);
        }
        else {
            template = Playlist.templateFound(myPlaylist);
        }
        this.container.insertAdjacentHTML('beforeend', template);
    }
    /**
     * Метод, добавляющий в HTML-разметку секции плейлистов сообщение о том, что по запросу ничего не найдено
     */
    nothingWasFound() {
        const template = '<h3 class="section__subtitle">По данному запросу ничего не найдено</h3>';
        this.container.insertAdjacentHTML('beforeend', template);
    }
    /**
     * Метод, очищающий HTML-разметку секции плейлистов
     */
    clearHtml() {
        this.container.innerHTML = '';
    }
}
