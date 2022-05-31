import { IPlaylist } from "./interfaces";

export class Playlist{

    private name: string;
    private author: string;
    private image: string;
    private id: string;

    /**
     * Конструктор для создания плейлиста
     * @constructor
     * @param {IPlaylist} playlistItem - Интерфейс плейлиста, на основе которого создается плейлист
     */
    constructor(playlistItem: IPlaylist) {
        if (playlistItem.name.length <= 18){
            this.name = playlistItem.name;
        } else {
            this.name = playlistItem.name.substr(0, 15) + " ..."
        }
        if (playlistItem.author.length <= 16){
            this.author = "Автор: " + playlistItem.author;
        } else {
            this.author = "Автор: " + playlistItem.author.substr(0, 13) + " ..."
        }
        this.image = playlistItem.image;
        this.id = playlistItem.id;
    }

    /**
     * Шаблон создания HTML-разметки для найденного плейлиста (статический метод)
     * @param {Playlist} playlist - Плейлист, на основе которого генерируется разметка
     * @param {boolean} isSaved - Флаговая переменная, обозначающая, сохранен ли данный плейлист в медиатеке пользователя 
     * (иначе он найден). Влияет на тип кнопки в нижней части панели - "Добавить" или "Удалить"
     * @returns {string} Строка с HTML-тегами
     */
    static template(playlist: Playlist, isSaved: boolean): string {
        const buttonTemplate = isSaved ? this.templateDeleteButton() : this.templateAddButton();
        return `
    <article class="section__column" data-id="${playlist.id}">
        <div class="item-about">
            <img src="${playlist.image}" alt="Плейлист" height="150" width="150">
            <div class="item-about__title">${playlist.name}</div>
            <div class="item-about__text">${playlist.author}</div>
            ${buttonTemplate}
        </div>
    </article>
    `;
    }

    /**
     * Шаблон создания кнопки "Добавить" (приватный статический метод)
     * @returns {string} Строка с HTML-тегом <button> и соответствующим набором атрибутов
     */
    private static templateAddButton(): string {
        return '<button type="button" class="item-about__action item-about__type_add">Добавить</button>';
    }

    /**
     * Шаблон создания кнопки "Удалить" (приватный статический метод)
     * @returns {string} Строка с HTML-тегом <button> и соответствующим набором атрибутов
     */
    private static templateDeleteButton(): string {
        return '<button type="button" class="item-about__action item-about__type_delete">Удалить</button>';
    }
}