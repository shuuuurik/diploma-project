import { useState, useEffect } from "react";
import { IPlaylist, ITrack } from "../interfaces";
import Api from '../utils/api';
import PlaylistWithButton from "./PlaylistWithButton";
import PlaylistWithoutButton from "./PlaylistWithoutButton";
import PlaylistsSection from "./PlaylistsSection";
import Track from "./Track";

/**
 * Компонент для отображения main
 * @component
 * @param {string} props.searchValue - Строка, на основе которой происходит поиск плейлистов 
 * (получена из поля input, находящемся в header)
*/
export default function Content(props: {
    searchValue: string
}) {
    const [savedPlaylists, setSavedPlaylists] = useState<IPlaylist[]>([]);
    const [foundPlaylists, setFoundPlaylists] = useState<IPlaylist[]>([]);
    const [token, setToken] = useState('');
    const [inputValue, setInputValue] = useState<string>('');
    const [foundTracks, setFoundTracks] = useState<ITrack[]>([]);
  
    useEffect(() => {
        getToken();
    }, [])

    const getToken = async () => {
        const token = await Api.getToken();
        setToken(token);
    }

    useEffect(() => {
        let isCancelled = false;
        if (token){
            Api.getMyPlaylists(token).then((playlists: void|IPlaylist[]) => {
                if (isCancelled) {
                    return;
                }
                else if (playlists){
                    setSavedPlaylists(playlists);
                }
            });
        }
        return () => {
            isCancelled = true;
        };
    }, [token]);

    useEffect(() => {
        if (props.searchValue.length > 1) {
            Api.query(token, props.searchValue, "playlist").then((playlists: void|IPlaylist[]) => {
                if (playlists)
                    setFoundPlaylists(playlists);
            })
        }
        else {
            setFoundPlaylists([]);
        }
    }, [props.searchValue, token]);

    useEffect(() => {
        if (inputValue.length > 1) {
            Api.query(token, inputValue, "track").then((tracks: void|ITrack[]) => {
                if (tracks)
                    setFoundTracks(tracks);
            })
        }
        else {
            setFoundTracks([]);
        }
    }, [inputValue, token]);

    return (
        <main className="content">
            <div className="playlists">
                <PlaylistsSection sectionClassName="search-results" sectionTitle="Результаты поиска"
                    children={
                        <>
                            {foundPlaylists.length
                            ? (
                                foundPlaylists.map((playlist: IPlaylist) => (
                                    <PlaylistWithButton playlist={playlist} isSaved={false} key={playlist.id}
                                        token={token} onSavedPlaylistsCallback={setSavedPlaylists}/>
                                ))
                            )
                            : (
                                props.searchValue.length ?
                                    (
                                        <h3 className="section__subtitle">По данному запросу ничего не найдено</h3>
                                    )
                                    : (
                                        <h3 className="section__subtitle">Введите поисковой запрос</h3>
                                    )
                            )}
                        </>}
                />
                <PlaylistsSection sectionClassName="favourite-playlists" sectionTitle="Мои плейлисты"
                    children={
                        <>
                            {savedPlaylists.length
                                ? (
                                    savedPlaylists.map((playlist: IPlaylist) => (
                                        <PlaylistWithButton  playlist={playlist} isSaved={true} key={playlist.id}
                                            token={token} onSavedPlaylistsCallback={setSavedPlaylists}/>
                                    ))
                                )
                                : (
                                    <h3 className="section__subtitle">Сохраните свой первый плейлист!</h3>
                                )}
                        </>}
                />
                <PlaylistsSection sectionClassName="recently" sectionTitle="Недавно прослушано"
                    children={
                        <>
                            <PlaylistWithoutButton playlist={{
                                image:"main/recently01.jpg",
                                name:"Night Visions",
                                author: "Imagine Dragons",
                                id: "01"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/recently02.jpg",
                                name:"Smoke + Mirrors",
                                author: "Imagine Dragons",
                                id: "02"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/recently03.jpg",
                                name:"Evolve",
                                author: "Imagine Dragons",
                                id: "03"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/recently04.jpg",
                                name:"Mercury - Act 1",
                                author: "Imagine Dragons",
                                id: "04"}}
                            />
                        </>}
                />
                <PlaylistsSection sectionClassName="workout" sectionTitle="Тренировка"
                    children={
                        <>
                            <PlaylistWithoutButton playlist={{
                                image:"main/workout01.jpg",
                                name:"Прокачка",
                                author: "Мощный хип-хоп для интенсивного...",
                                id: "11"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/workout02.jpg",
                                name:"Motivation Mix",
                                author: "Uplifting and energetic music that helps you...",
                                id: "12"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/workout03.jpg",
                                name:"Rock Your Body",
                                author: "Burn off all those beers from last night",
                                id: "13"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/workout04.jpg",
                                name:"Workout",
                                author: "Pop hits to keep your workout fresh",
                                id: "14"}}
                            />
                        </>}
                />
                <PlaylistsSection sectionClassName="personal" sectionTitle="Персональные подборки"
                    children={
                        <>
                            <PlaylistWithoutButton playlist={{
                                image:"main/personal01.jpg",
                                name:"На повторе",
                                author: "Треки, которые тебе нравятся сейчас",
                                id: "21"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/personal02.jpg",
                                name:"Ностальгический...",
                                author: "Мы создали ностальгический...",
                                id: "22"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/personal03.jpg",
                                name:"На повторе: флэш...",
                                author: "Треки, которые были твоими любимыми",
                                id: "23"}}
                            />
                            <PlaylistWithoutButton playlist={{
                                image:"main/personal04.jpg",
                                name:"Любимые треки",
                                author: "25 треков",
                                id: "24"}}
                            />
                        </>}
                />
            </div>
            <hr/>
            <div className="tracks">
                <section className="favourite">
                    <h2 className="favourite__title">Любимые треки</h2>
                        <Track track={{
                            image: "main/track01.jpg",
                            name: "Покинула чат",
                            artist: "Клава Кока",
                            time: "2:53"
                        }} isCurrent={false}/>
                        <Track track={{
                            image: "main/track02.jpg",
                            name: "Краш",
                            artist: "Клава Кока",
                            time: "2:51"
                        }} isCurrent={false}/>
                        <Track track={{
                            image: "main/track03.jpg",
                            name: "Believer",
                            artist: "Imagine Dragons",
                            time: "3:24"
                        }} isCurrent={false}/>
                        <Track track={{
                            image: "main/track04.jpg",
                            name: "Demons",
                            artist: "Imagine Dragons",
                            time: "2:57"
                        }} isCurrent={false}/>
                        <Track track={{
                            image: "main/track05.jpg",
                            name: "Зелёные волны",
                            artist: "Zivert",
                            time: "3:43"
                        }} isCurrent={false}/>
                </section>
                    <section className="search-tracks">
                    <h2 className="search-tracks__title">Поиск треков</h2>
                    <input 
                        className="search-tracks__search" 
                        type="search" 
                        placeholder="Название трека"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
                    />
                    {foundTracks.length
                        ? (
                            foundTracks.map((track: ITrack) => (
                                <Track track={track} isCurrent={false} key={track.id}/>
                            ))
                        )
                        : (
                            inputValue.length ?
                                (
                                    <h3 className="section__subtitle">По данному запросу ничего не найдено</h3>
                                )
                                : (
                                    <h3 className="section__subtitle">Введите поисковой запрос</h3>
                                )
                        )}
                </section>
            </div>
        </main>
    );
}