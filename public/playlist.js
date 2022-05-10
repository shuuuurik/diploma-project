export class Playlist {
    /**
     * Конструктор для создания плейлиста
     * @constructor
     * @param {IPlaylist} playlistItem - Интерфейс плейлиста, на основе которого создается плейлист
     */
    constructor(playlistItem) {
        if (playlistItem.name.length <= 18) {
            this.name = playlistItem.name;
        }
        else {
            this.name = playlistItem.name.substr(0, 15) + " ...";
        }
        if (playlistItem.author.length <= 16) {
            this.author = "Автор: " + playlistItem.author;
        }
        else {
            this.author = "Автор: " + playlistItem.author.substr(0, 13) + " ...";
        }
        this.image = playlistItem.image;
        this.id = playlistItem.id;
    }
    /**
     * Шаблон создания HTML-разметки для найденного плейлиста (статический метод)
     * @param {Playlist} playlist - Плейлист, на основе которого генерируется разметка
     * @returns {string} Строка с HTML-тегами
     */
    static templateFound(playlist) {
        return `
    <article class="section__column" data-id="${playlist.id}">
        <div class="item-about">
            <img src="${playlist.image}" alt="Плейлист" height="150" width="150">
            <div class="item-about__title">${playlist.name}</div>
            <div class="item-about__text">${playlist.author}</div>
            <button type="button" class="item-about__action item-about__type_add">Добавить</button>
        </div>
    </article>
    `;
    }
    /**
     * Шаблон создания HTML-разметки для плейлиста из медиатеки пользователя (статический метод)
     * @param {Playlist} playlist - Плейлист, на основе которого генерируется разметка
     * @returns {string} Строка с HTML-тегами
     */
    static templateMy(playlist) {
        return `
    <article class="section__column" data-id="${playlist.id}">
        <div class="item-about">
            <img src="${playlist.image}" alt="Плейлист" height="150" width="150">
            <div class="item-about__title">${playlist.name}</div>
            <div class="item-about__text">${playlist.author}</div>
            <button type="button" class="item-about__action item-about__type_delete">Удалить</button>
        </div>
    </article>
    `;
    }
}
