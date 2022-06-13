interface IPlaylist {
    image: string;
    name: string;
    author: string;
    id: string;
}

interface ITrack {
    image: string;
    name: string;
    artist: string;
    time?: string;
    id?: string;
}

export type{
    IPlaylist, ITrack
 }