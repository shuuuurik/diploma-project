import Api from './api.js';
import { PlaylistSection } from './playlistsection.js';
const $searchInput = document.querySelector('.header__search');
const $foundSection = document.querySelector('.found-playlists');
const $savedSection = document.querySelector('.my-playlists');
const $playlists = document.querySelector('.playlists');
const token = await Api.getToken();
const foundPlaylistSection = new PlaylistSection($foundSection);
const savedPlaylistSection = new PlaylistSection($savedSection);
/**
* Метод, занимающийся поиском и HTML-разметкой секции найденных плейлистов
* @param {string} searchParam? - Строка, на основе которой проводится поиск плейлистов
*/
const renderFoundSection = async (searchParam) => {
    return await Api.query(token, searchParam).then((playlists) => {
        foundPlaylistSection.clearHtml();
        if (searchParam && searchParam.length > 1 && (playlists === null || playlists === void 0 ? void 0 : playlists.length)) {
            playlists === null || playlists === void 0 ? void 0 : playlists.forEach((item) => {
                foundPlaylistSection.add(item, false);
            });
        }
        else {
            foundPlaylistSection.nothingWasFound();
        }
    });
};
$searchInput.addEventListener('input', async (event) => {
    const input = event.target;
    const searchValue = input.value;
    await renderFoundSection(searchValue);
});
/**
* Метод, занимающийся получением сохраненных плейлистов из медиатеки пользователя HTML-разметкой соответствующей секции
*/
const renderSavedSection = async () => {
    return await Api.getMyPlaylists(token).then((playlists) => {
        savedPlaylistSection.clearHtml();
        playlists === null || playlists === void 0 ? void 0 : playlists.forEach((item) => {
            savedPlaylistSection.add(item, true);
        });
    });
};
/**
* Обработчик для кнопок "Добавить" и "Удалить"
*/
$playlists.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('item-about__type_add')) {
        const playlistItem = target.closest('.section__column');
        const itemId = playlistItem.dataset.id;
        await Api.followPlaylist(token, itemId);
        await renderSavedSection();
    }
    if (target.classList.contains('item-about__type_delete')) {
        const playlistItem = target.closest('.section__column');
        const itemId = playlistItem.dataset.id;
        await Api.unfollowPlaylist(token, itemId);
        await renderSavedSection();
    }
});
await renderSavedSection();
await renderFoundSection();
