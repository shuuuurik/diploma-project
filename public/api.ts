import { IPlaylist } from './interfaces';

class Api {
    private static clientId = '44a8232cc5a34b68a8bfb31f0ae3200a';
    private static clientSecret = 'd390d8c6812c4d858d8cae2198c101c8';

    /**
     * Статический метод, посылающий запрос о получении токена
     * @returns {Promise<string>} Промис с полученным токеном
     */
    static async getToken(): Promise<string>{
        try {
            const result = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Authorization' : 'Basic ' + btoa(Api.clientId + ':' + Api.clientSecret)
                },
                body: 'grant_type=client_credentials'
            });
            const data = await result.json();
            if (!data.access_token)
                throw new Error("Failed to get token.");
            return data.access_token;
        } catch (err: any){
            alert(err.message + " Пожалуйста, перезагрузите страницу");
            return err.message;
        }
    }

    /**
     * Статический метод, посылающий запрос на поиск плейлистов по строке
     * @param {string} token - Токен, необходимый для запроса
     * @param {string} searchParam - Строка, на основе которой проводится поиск плейлистов
     * @returns {Promise<void|IPlaylist[]>} Промис с массивом плейлистов
     */
    static async query(token: string, searchParam?: string): Promise<void|IPlaylist[]>{
        try {
            const limit = 4;
            const answer = await fetch(`https://api.spotify.com/v1/search?q=name:${searchParam}&type=playlist&limit=${limit}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                }
            });
            return this.extractingPlaylists(answer);
        } catch(err: any) { 
            alert(err.message + " Пожалуйста, перезагрузите страницу");
        }
    }

    /**
     * Статический метод, посылающий запрос на получение плейлистов, сохраненных пользователем в медиатеке
     * @param {string} token - Токен, необходимый для запроса
     * @returns {Promise<void|IPlaylist[]>} Промис с массивом плейлистов
     */
    static async getMyPlaylists(token: string): Promise<void|IPlaylist[]>{
        try{
            const limit = 4;
            const answer = await fetch(`https://api.spotify.com/v1/users/31br7srijy5u4rojgik7mvbdj3de/playlists?limit=${limit}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });
            return this.extractingPlaylists(answer);
        } catch(err: any) { 
            alert(err.message + " Пожалуйста, перезагрузите страницу");
        }
    }

    /**
     * Приватный статический метод, обрабатывающий полученный от сервера ответ 
     * (выбрасывает ошибку или извлекает данные плейлистов)
     * @param {Response} answer - ответ, полученный от сервера
     * @returns {Promise<IPlaylist[]>} Промис с массивом плейлистов
     */
    private static async extractingPlaylists(answer: Response): Promise<IPlaylist[]>{
        const data = await answer.json();
        if (answer.status !== 200){
            throw new Error(data.error.message);
        } else {
            const playlists = data.playlists.items;
            const newItems: IPlaylist[] = [];
            playlists?.forEach((item: any): void => {
                const data: IPlaylist = { ...item, image: item.images[0].url, author: item.owner.display_name};
                newItems.push(data);
            });
            return newItems;
        }     
    }

    /**
     * Статический метод, посылающий запрос на добавление плейлиста по id в медиатеку пользователя (не реализован)
     * @param {string} token - Токен, необходимый для запроса
     * @param {string} id - Уникальный Spotify ID добавляемого плейлиста
     */
    static async followPlaylist(token: string, id: string){
        await this.sendRequest(token, id, true);
    }

    /**
     * Статический метод, посылающий запрос на удаление плейлиста по id из медиатеки пользователя (не реализован)
     * @param {string} token - Токен, необходимый для запроса
     * @param {string} id - Уникальный Spotify ID удаляемого плейлиста
     */
    static async unfollowPlaylist(token: string, id: string){
        await this.sendRequest(token, id, false);
    }

    /**
     * Закрытый статический метод, посылающий соответствующий запро серверу (не реализован)
     * @param {string} token - Токен, необходимый для запроса
     * @param {string} id - Уникальный Spotify ID удаляемого плейлиста
     * @param {boolean} isFollow - Флаговая переменная, показывающая какой запрос нужно послать - PUT или DELETE
     */
    private static async sendRequest(token: string, id: string, isFollow: boolean){
        const methodName: string = isFollow ? 'PUT' : 'DELETE';
        const result = await fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
            method: methodName,
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        if (result.status !== 200){
            const data = await result.json();
            alert (data.error.message);
        }
    }
}

export default Api;