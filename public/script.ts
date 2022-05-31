import Api from './api.js';
import { IPlaylist } from './interfaces.js';
import { PlaylistSection } from './playlistsection.js'

const $searchInput = document.querySelector('.header__search') as HTMLInputElement;
const $foundSection = document.querySelector('.found-playlists') as HTMLElement;
const $savedSection = document.querySelector('.my-playlists') as HTMLElement;
const $playlists = document.querySelector('.playlists') as HTMLElement;

const token: string = await Api.getToken();

const foundPlaylistSection = new PlaylistSection($foundSection);
const savedPlaylistSection = new PlaylistSection($savedSection);

/**
* Метод, занимающийся поиском и HTML-разметкой секции найденных плейлистов
* @param {string} searchParam - Строка, на основе которой проводится поиск плейлистов
*/
const renderFoundSection = async (searchParam? : string): Promise<void> => {
    return await Api.query(token, searchParam).then((playlists: void|IPlaylist[]) => {
        foundPlaylistSection.clearHtml();
        if (searchParam && searchParam.length > 1 && playlists?.length) {
            playlists.forEach((item: IPlaylist): void => {
                foundPlaylistSection.add(item, false);
            });
        } else {
            foundPlaylistSection.nothingWasFound();
        }
    });
}

$searchInput.addEventListener('input', async (event) => {
    const input = event.target as HTMLInputElement;
    const searchValue = input.value;
    await renderFoundSection(searchValue);
});

/**
* Метод, занимающийся получением сохраненных плейлистов из медиатеки пользователя HTML-разметкой соответствующей секции 
*/
const renderSavedSection = async (): Promise<void> => {
    return await Api.getMyPlaylists(token).then((playlists: void|IPlaylist[]) => {
        savedPlaylistSection.clearHtml();
        playlists?.forEach((item: IPlaylist): void => {
            savedPlaylistSection.add(item, true);
        });
    });
}

/**
* Обработчик для кнопок "Добавить" и "Удалить" 
*/
$playlists.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('item-about__type_add')) {
        const playlistItem = target.closest('.section__column') as HTMLElement;
        const itemId = playlistItem.dataset.id as string;
        await Api.followPlaylist(token, itemId);
        await renderSavedSection();
    }
    if (target.classList.contains('item-about__type_delete')) {
        const playlistItem = target.closest('.section__column') as HTMLElement;
        const itemId = playlistItem.dataset.id as string;
        await Api.unfollowPlaylist(token, itemId);
        await renderSavedSection();
    }
});

await renderSavedSection();
await renderFoundSection();
