import { IPlaylist } from './interfaces';

class Api {
    private static clientId = '44a8232cc5a34b68a8bfb31f0ae3200a';
    private static clientSecret = 'd390d8c6812c4d858d8cae2198c101c8';

    /**
     * Статический метод, посылающий запрос о получении токена
     * @returns {Promise<string>} Промис с полученным токеном
     */
    static getToken(): Promise<string>{
        return fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(Api.clientId + ':' + Api.clientSecret)
            },
            body: 'grant_type=client_credentials'
        }).then((res) => res.json()).then((res) => {
            if (!res.access_token)
                throw new Error("Failed to get token.");
            return res.access_token;
        }).catch((err: any) => alert(err.message + " Пожалуйста, перезагрузите страницу"));
    }

    /**
     * Статический метод, посылающий запрос на поиск плейлистов по строке
     * @param {string} token - Токен, необходимый для запроса
     * @param {string} searchParam - Строка, на основе которой проводится поиск плейлистов
     * @returns {Promise<void|IPlaylist[]>} Промис с массивом плейлистов
     */
    static query(token: string, searchParam?: string): Promise<void|IPlaylist[]>{
        const limit = 4;
        return fetch(`https://api.spotify.com/v1/search?q=name:${searchParam}&type=playlist&limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        }).then((res) => {
            if (res.status === 200){
                return res.json();
            } else {
                const response = res.json(); //не получилось извлечь из этого промиса сообщение ошибки (error.message) 

                /*let message: string;
                response.then((err) => {
                    message = err.error.message;
                });
                throw new Error(message);*/

                /*response.then((err) => {
                    throw new Error(err.error.message);
                });*/

               throw new Error('Something went wrong.');
            }
        }).then((res) => res.playlists.items).then((items) => {
            let newItems: IPlaylist[] = [];
            items?.forEach((item: any): void => {
                let data: IPlaylist = { ...item, image: item.images[0].url, author: item.owner.display_name};
                newItems.push(data);
            });
            return newItems;
        }).catch((err: any) => alert(err.message + " Пожалуйста, перезагрузите страницу"));
    }

    /**
     * Статический метод, посылающий запрос на получение плейлистов, сохраненных пользователем в медиатеке
     * @param {string} token - Токен, необходимый для запроса
     * @returns {Promise<void|IPlaylist[]>} Промис с массивом плейлистов
     */
    static getMyPlaylists(token: string): Promise<void|IPlaylist[]>{
        const limit = 4;
        return fetch(`https://api.spotify.com/v1/users/31br7srijy5u4rojgik7mvbdj3de/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        }).then((res) => res.json()).then((res) => {
            if(res.items){
                return res.items;
            } else {
                throw new Error(res.error.message);
            }
        }).then((items) => {
            let newItems: IPlaylist[] = [];
            items?.forEach((item: any): void => {
                let data: IPlaylist = { ...item, image: item.images[0].url, author: item.owner.display_name};
                newItems.push(data);
            });
            return newItems;
        }).catch((err: any) => alert(err.message + " Пожалуйста, перезагрузите страницу"));
    }

    /**
     * Статический метод, посылающий запрос на добавление плейлиста по id в медиатеку пользователя (не реализован)
     * @param {string} token - Токен, необходимый для запроса
     * @param {string} id - Уникальный Spotify ID добавляемого плейлиста
     */
    static followPlaylist(token: string, id: string){
        return fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
            method: 'PUT',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    }

    /**
     * Статический метод, посылающий запрос на удаление плейлиста по id из медиатеки пользователя (не реализован)
     * @param {string} token - Токен, необходимый для запроса
     * @param {string} id - Уникальный Spotify ID удаляемого плейлиста
     */
    static unfollowPlaylist(token: string, id: string){
        return fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
            method: 'DELETE',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    }
}

export default Api;