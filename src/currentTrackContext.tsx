import React from 'react';
import { ITrack } from './interfaces';
 
export const initialTrack: ITrack = {
    image: "main/track01.jpg",
    name: "Покинула чат",
    artist: "Клава Кока",
    time: "3:53"
}

export const CurrentTrackContext = React.createContext({
    track: initialTrack,
    changeTrack: (newTrack: ITrack) => {},
});