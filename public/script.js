import Api from './api.js';
import { PlaylistSection } from './playlistsection.js';
const $searchInput = document.querySelector('.header__search');
const $foundSection = document.querySelector('.found-playlists');
const $mySection = document.querySelector('.my-playlists');
const token = await Api.getToken();
console.log(token);
const foundPlaylistSection = new PlaylistSection($foundSection);
const myPlaylistSection = new PlaylistSection($mySection);
/**
* Метод, занимающийся поиском и HTML-разметкой секции найденных плейлистов
* @param {string} searchParam? - Строка, на основе которой проводится поиск плейлистов
*/
const renderFoundSection = async (searchParam) => {
    return await Api.query(token, searchParam).then((playlists) => {
        foundPlaylistSection.clearHtml();
        if (searchParam && searchParam.length > 1) {
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
* Метод, занимающийся получением плейлистов из медиатеки пользователя HTML-разметкой соответствующей секции
*/
const renderMySection = async () => {
    return await Api.getMyPlaylists(token).then((playlists) => {
        myPlaylistSection.clearHtml();
        playlists === null || playlists === void 0 ? void 0 : playlists.forEach((item) => {
            myPlaylistSection.add(item, true);
        });
    });
};
$foundSection.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('item-about__type_add')) {
        const playlistItem = target.closest('.section__column');
        const itemId = playlistItem.dataset.id;
        await Api.followPlaylist(token, itemId);
        await renderMySection();
    }
});
$foundSection.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('item-about__type_delete')) {
        const playlistItem = target.closest('.section__column');
        const itemId = playlistItem.dataset.id;
        await Api.unfollowPlaylist(token, itemId);
        await renderMySection();
    }
});
await renderMySection();
await renderFoundSection();
