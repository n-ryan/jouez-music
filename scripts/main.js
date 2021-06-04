MusicKit.configure({
    declarativeMarkup: true,
    developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktMM1o4QlI1MkgifQ.eyJpc3MiOiJXQU44QkRCVlNCIiwiaWF0IjoxNjIxMDM1NTUyLCJleHAiOjE2MzY3NjE2MDB9.vh9Rq2q9VV28w5IrvYGgg_rRxRra6rm4UxrFwXMgbyp2csSJ30SsVrgacV2Nl3IDx51ZKk_BNbuLmRHumqe5QQ',
    debug: true,
    features: ['player-accurate-timing', 'api-data-store', 'api-session-storage', 'api-artist-include'],
    storefrontId: 'us',
    suppressErrorDialog: false,
    app: {
        name: "Jouez Music",
        build: "0.9"
    }
});

let music = MusicKit.getInstance();

const authButton = document.querySelector('#authorize');

let isSignedIn;
if (music.isAuthorized) {
    isSignedIn = true;
    authButton.innerHTML = "Sign Out of Apple Music";
} else {
    isSignedIn = false;
    authButton.innerHTML = "Sign In to Apple Music";
}

const authorizeUser = () => {
    if (!isSignedIn) {
        music.authorize().catch(function(error) {
            console.log(error);
        });
        isSignedIn = true;
        authButton.innerHTML = "Sign Out of Apple Music";
        window.location.reload();
    } else {
        music.unauthorize();
        isSignedIn = false;
        authButton.innerHTML = "Sign In to Apple Music";
        window.location.reload();
    }
};

const getLibraryAlbums = () => {
    music.api.library.albums({ limit: 100, offset: 0 }).then(function(results) {
        let libraryAlbums = results;
        // console.log(libraryAlbums);
        for (album of libraryAlbums) {
            let albumArt = MusicKit.formatArtworkURL(album.artwork, 200, 200);
            // console.log(albumArt);
            document.querySelector('#library-albums-grid').innerHTML += `
            <div class="album">
                <div id="album-info">${album.artistName} - ${album.name}</div>
                <img id="album-art" src="${albumArt}" data-item-id="${album.id}"></img>
            </div>`;
            const albumClass = document.querySelectorAll('.album');
            for (item of albumClass) {
                item.addEventListener('click', playAlbum);
            };
        }
    }).catch(function(error) {
        if (error == "ACCESS_DENIED: 403") {
            window.alert("You must be logged in to access your library.");
        } else {
            window.alert(error);
        }
    });
};

const search = (ev) => {
    const searchTerm = document.querySelector('#music-search').value;
    const searchResultView = document.querySelector('.search-results');
    music.api.search(searchTerm, { types: 'albums,artists,playlists,songs', limit: 25, offset: 0 }).then(function(results) {
        const songResults = results.songs;
        const albumResults = results.albums;
        const artistResults = results.artists;
        const playlistResults = results.playlists;
        const videoResults = results['music-videos'];
        
        for (const song of songResults) {
            document.querySelector('.song-results').innerHTML += `
                <div class="song-result" data-item-id=${song.id}>${song.name} - ${song.artistName} - ${song.albumName}</div>`
        }

        for (const album of albumResults) {
            document.querySelector('.album-results').innerHTML += `
                <div class="album-result" data-item-id=${album.id}>${album.name} - ${album.artistName}</div>`
        }

        for (const artist of artistResults.slice(0, 5)) {
            document.querySelector('.artist-results').innerHTML += `
                <div class="artist-result" data-item-id=${artist.id}>${artist.name}<br><a href="${artist.url}" target="blank">View on Apple Music</a></div>`
        }

        for (const playlist of playlistResults) {
            document.querySelector('.playlist-results').innerHTML += `
                <div class="playlist-result" data-item-id=${playlist.id}>${playlist.name}</div>`
        }

        for (const video of videoResults) {
            document.querySelector('.music-video-results').innerHTML += `
                <div class="music-video-result" data-item-id=${video.id}>${video.name} - ${video.artistName} - ${video.albumName}</div>`
        }
        
        searchResultView.style.display = "grid";
    });
}

const playAlbum = (ev) => {
    console.log(ev);
    music.setQueue({ album: ev.target.dataset.itemId }).then(function(queue) {
        console.log(queue);
        music.player.play();
    });
}

const updateNowPlaying = (ev) => {
    console.log(ev);
    const newMediaItem = ev.item;
    const nowPlayingTrack = document.querySelector('#now-playing-track');
    const nowPlayingArtist = document.querySelector('#now-playing-artist');
    const nowPlayingAlbum = document.querySelector('#now-playing-album');
    const nowPlayingArtwork = document.querySelector('#now-playing-artwork');

    nowPlayingTrack.innerHTML = newMediaItem.title;
    nowPlayingArtist.innerHTML = newMediaItem.artistName;
    nowPlayingAlbum.innerHTML = newMediaItem.container.attributes.name;
    nowPlayingArtwork.src = MusicKit.formatArtworkURL(newMediaItem.artwork, 60, 60);
}

music.addEventListener(MusicKit.Events.mediaItemDidChange, updateNowPlaying);

authButton.addEventListener('click', authorizeUser);



