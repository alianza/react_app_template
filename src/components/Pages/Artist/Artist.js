import React, { useEffect, useState } from "react";
import Loader from "../../../lib/Loader";
import ExampleMusicService from "../../../lib/services/ExampleMusicService";
import { match } from "react-router-dom";

function Artist(props: { match: match }) {
    const artistName = decodeURIComponent(props.match.params.artistName)
    const [songs, setSongs] = useState([])

    useEffect(() => { // Initial data fetch
        Loader.showLoader()
        ExampleMusicService.getSongsByArtistName(artistName).then(songs => {
            setSongs(songs)
            Loader.hideLoader()
        })
    }, [artistName])

    return (
        <div id={'artist'} className={'flex flex-wrap justify-between gap-2'}>
            <div className={'w-full'}>
                <h1 className={'mb-4'}>Artist: "{artistName}"</h1>
                <h2>{songs?.length} Song{songs?.length !== 1 && 's'}{songs?.length !== 0 && ':'}</h2>
            </div>
            {songs && songs.map(song => <div key={song.id} >{song.name}</div> )}
        </div>
    );
}

export default Artist;
