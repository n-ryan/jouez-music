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

// const authButton = document.querySelector('#authorize');

let albumsDisplayed;
let artistsDisplayed;
let songsDisplayed;
let playlistsDisplayed;

const getLibraryAlbums = () => {
    document.querySelector('#library-view').innerHTML = "<h3>Getting your albums now...</h3>";
    document.querySelector('#load-more').style.display = "none";
    music.api.library.albums({ limit: 100, offset: 0 }).then(function(results) {
        albumsDisplayed = 0;
        let libraryAlbums = results;
        document.querySelector('#library-view').innerHTML = "";
        for (album of libraryAlbums) {
            let albumArt = MusicKit.formatArtworkURL(album.artwork, 200, 200);
            document.querySelector('#library-view').innerHTML += `
            <div class="album" onclick="playAlbum(event)">
                <div id="album-info">${album.artistName} - ${album.name}</div>
                <img id="album-art" src="${albumArt}" data-item-id="${album.id}"></img>
            </div>`;
            albumsDisplayed += 1;
        }
        document.querySelector('#load-more').style.display = "inherit";
    }).catch(function(error) {
        if (error == "ACCESS_DENIED: 403") {
            window.alert("You must be logged in to access your library.");
        } else {
            window.alert(error);
        }
    });
};

const getLibraryArtists = () => {
    document.querySelector('#library-view').innerHTML = "<h3>Getting your artists now...</h3>";
    document.querySelector('#load-more').style.display = "none";
    music.api.library.artists({ limit: 100, offset: 0 }).then(function(results) {
        artistsDisplayed = 0;
        let libraryArtists = results;
        console.log(libraryArtists);
        document.querySelector('#library-view').innerHTML = "";
        for (artist of libraryArtists) {
            document.querySelector('#library-view').innerHTML += `
            <div class="artist" data-item-id="${artist.id}">
                ${artist.name}
            </div>`;
            artistsDisplayed += 1;
        }
        document.querySelector('#load-more').style.display = "inherit";
    }).catch(function(error) {
        if (error == "ACCESS_DENIED: 403") {
            window.alert("You must be logged in to access your library.");
        } else {
            window.alert(error);
        }
    });
};

const getLibrarySongs = () => {
    document.querySelector('#library-view').innerHTML = "<h3>Getting your songs now...</h3>";
    document.querySelector('#load-more').style.display = "none";
    music.api.library.songs({ limit: 100, offset: 0 }).then(function(results) {
        songsDisplayed = 0;
        let librarySongs = results;
        console.log(librarySongs);
        document.querySelector('#library-view').innerHTML = "";
        for (song of librarySongs) {
            document.querySelector('#library-view').innerHTML += `
            <div class="song" data-item-id="${song.id}">
                <div class="song-info">
                    <div class="song-info-name">${song.name}</div>
                    <div>${song.artistName}</div>
                    <div>${song.albumName}</div>
                </div>
                <div class="song-controls">
                    <i class="bi bi-play-fill" onclick="playSong(event)" data-item-id="${song.id}"></i>
                    <i class="bi bi-arrow-right" onclick="playSongNext(event)" data-item-id="${song.id}"></i>
                    <i class="bi bi-arrow-return-right" onclick="playSongLast(event)" data-item-id="${song.id}"></i>
                </div>
            </div>`;
            songsDisplayed += 1;
        }
        document.querySelector('#load-more').style.display = "inherit";
    }).catch(function(error) {
        if (error == "ACCESS_DENIED: 403") {
            window.alert("You must be logged in to access your library.");
        } else {
            window.alert(error);
        }
    });
};

const getLibraryPlaylists = () => {
    document.querySelector('#library-view').innerHTML = "<h3>Getting your playlists now...</h3>";
    document.querySelector('#load-more').style.display = "none";
    music.api.library.playlists({ limit: 100, offset: 0 }).then(function(results) {
        playlistsDisplayed = 0;
        let libraryPlaylists = results;
        console.log(libraryPlaylists);
        document.querySelector('#library-view').innerHTML = "";
        for (playlist of libraryPlaylists) {
            if (playlist.artwork) {
                let playlistArt = MusicKit.formatArtworkURL(playlist.artwork, 200, 200);
                document.querySelector('#library-view').innerHTML += `
                <div class="playlist" onclick="playPlaylist(event)">
                    <div id="playlist-info">${playlist.name}</div>
                    <img id="playlist-art" src="${playlistArt}" data-item-id="${playlist.id}"></img>
                </div>`;
            } else {
                document.querySelector('#library-view').innerHTML += `
                <div class="playlist" onclick="playPlaylist(event)">
                    <div id="playlist-info-no-art">${playlist.name}</div>
                    <img id="playlist-art" src="images/jouez-icon.png" data-item-id="${playlist.id}" style="display: none;"></img>
                </div>`;
            }
            playlistsDisplayed += 1;
        }
        document.querySelector('#load-more').style.display = "inherit";
    }).catch(function(error) {
        if (error == "ACCESS_DENIED: 403") {
            window.alert("You must be logged in to access your library.");
        } else {
            window.alert(error);
        }
    });
};

const loadMore = (ev) => {
    const libraryView = document.querySelector('#library-view');
    if (libraryView.classList.contains('library-albums-grid')) {
        music.api.library.albums({ limit: 100, offset: albumsDisplayed }).then(function(results) {
            let libraryAlbums = results;
            if (libraryAlbums.length > 0) {
                for (album of libraryAlbums) {
                    let albumArt = MusicKit.formatArtworkURL(album.artwork, 200, 200);
                    document.querySelector('#library-view').innerHTML += `
                    <div class="album" onclick="playAlbum(event)">
                        <div id="album-info">${album.artistName} - ${album.name}</div>
                        <img id="album-art" src="${albumArt}" data-item-id="${album.id}"></img>
                    </div>`;
                    albumsDisplayed += 1;
                }
            } else {
                document.querySelector('#load-more').style.display = "none";
                window.alert("All albums have been displayed.");
            }
        }).catch(function(error) {
            if (error == "ACCESS_DENIED: 403") {
                window.alert("You must be logged in to access your library.");
            } else {
                window.alert(error);
            }
        });
    } else if (libraryView.classList.contains('library-artists')) {
        music.api.library.artists({ limit: 100, offset: artistsDisplayed }).then(function(results) {
            let libraryArtists = results;
            console.log(libraryArtists);
            if (libraryArtists.length > 0) {
                for (artist of libraryArtists) {
                    document.querySelector('#library-view').innerHTML += `
                    <div class="artist" data-item-id="${artist.id}">
                        ${artist.name}
                    </div>`;
                    artistsDisplayed += 1;
                }
            } else {
                document.querySelector('#load-more').style.display = "none";
                window.alert("All artists have been displayed.");
            }
        }).catch(function(error) {
            if (error == "ACCESS_DENIED: 403") {
                window.alert("You must be logged in to access your library.");
            } else {
                window.alert(error);
            }
        });
    } else if (libraryView.classList.contains('library-songs')) {
        music.api.library.songs({ limit: 100, offset: songsDisplayed }).then(function(results) {
            let librarySongs = results;
            console.log(librarySongs);
            if (librarySongs.length > 0) {
                for (song of librarySongs) {
                    document.querySelector('#library-view').innerHTML += `
                    <div class="song" data-item-id="${song.id}">
                        <div class="song-info">
                            <div class="song-info-name">${song.name}</div>
                            <div>${song.artistName}</div>
                            <div>${song.albumName}</div>
                        </div>
                        <div class="song-controls">
                            <i class="bi bi-play-fill" onclick="playSong(event)" data-item-id="${song.id}"></i>
                            <i class="bi bi-arrow-right" onclick="playSongNext(event)" data-item-id="${song.id}"></i>
                            <i class="bi bi-arrow-return-right" onclick="playSongLast(event)" data-item-id="${song.id}"></i>
                        </div>
                    </div>`;
                    songsDisplayed += 1;
                }
            } else {
                document.querySelector('#load-more').style.display = "none";
                window.alert("All songs have been displayed.");
            }
        }).catch(function(error) {
            if (error == "ACCESS_DENIED: 403") {
                window.alert("You must be logged in to access your library.");
            } else {
                window.alert(error);
            }
        });
    } else if (libraryView.classList.contains('library-playlists')) {
        music.api.library.playlists({ limit: 100, offset: playlistsDisplayed }).then(function(results) {
            let libraryPlaylists = results;
            console.log(libraryPlaylists);
            if (libraryPlaylists.length > 0) {
                for (playlist of libraryPlaylists) {
                    if (playlist.artwork) {
                        let playlistArt = MusicKit.formatArtworkURL(playlist.artwork, 200, 200);
                        document.querySelector('#library-view').innerHTML += `
                        <div class="playlist" onclick="playPlaylist(event)">
                            <div id="playlist-info">${playlist.name}</div>
                            <img id="playlist-art" src="${playlistArt}" data-item-id="${playlist.id}"></img>
                        </div>`;
                    } else {
                        document.querySelector('#library-view').innerHTML += `
                        <div class="playlist" onclick="playPlaylist(event)">
                            <div id="playlist-info-no-art">${playlist.name}</div>
                            <img id="playlist-art" src="images/jouez-icon.png" data-item-id="${playlist.id}" style="display: none;"></img>
                        </div>`;
                    }
                    playlistsDisplayed += 1;
                }
            } else {
                document.querySelector('#load-more').style.display = "none";
                window.alert("All playlists have been displayed.");
            }
        }).catch(function(error) {
            if (error == "ACCESS_DENIED: 403") {
                window.alert("You must be logged in to access your library.");
            } else {
                window.alert(error);
            }
        });
    };
};

const displayQueue = (ev) => {
    let queue = music.player.queue;
    let queueList = queue.items;
    console.log(queueList);
    const queueView = document.querySelector('.queue-view');

    if (queue.isEmpty) {
        queueView.innerHTML = "<h3>Your queue is currently empty. Try playing some music from your library!</h3>";
    } else {
        queueView.innerHTML = "";
        for (const item of queueList.slice(queue.position + 1, queue.length)) {
            queueView.innerHTML += `
                <div class="queue-item">
                    <div class="item-content">
                        <img class="queue-artwork" src="${MusicKit.formatArtworkURL(item.artwork, 60, 60)}">
                        <div class="item-info">
                            <div class="item-title">${item.title}</div>
                            <div class="item-artist">${item.artistName}</div>
                        </div>
                    </div>
                    <div class="queue-controls">
                        <i class="bi bi-x-lg" data-item-id="${item.id}" onclick="removeFromQueue(event)"></i>
                    </div>
                </div>`
        }
    }
}

const updateQueue = (ev) => {
    if (document.querySelector('.queue-view') !== null) {
        displayQueue();
    }
}

const removeFromQueue = (ev) => {
    const itemID = ev.target.dataset.itemId;
    const itemIndex = music.player.queue.indexForItem(itemID);
    music.player.queue.remove(itemIndex);
}

const search = (ev) => {
    const searchTerm = document.querySelector('#music-search').value;
    const searchResultView = document.querySelector('.search-results');
    music.api.search(searchTerm, { types: 'albums,artists,playlists,songs', limit: 25, offset: 0 }).then(function(results) {
        const songResults = results.songs;
        const albumResults = results.albums;
        const artistResults = results.artists;
        const playlistResults = results.playlists;
        const videoResults = results['music-videos'];
        
        for (const song of songResults.slice(0, 3)) {
            document.querySelector('.song-results').innerHTML += `
                <div class="song-result song" data-item-id="${song.id}">
                    <div class="song-info">
                        <div class="song-info-name">${song.name}</div>
                        <div>${song.artistName}</div>
                        <div>${song.albumName}</div>
                    </div>
                    <div class="song-controls">
                        <i class="bi bi-play-fill" onclick="playSong(event)" data-item-id="${song.id}"></i>
                        <i class="bi bi-arrow-right" onclick="playSongNext(event)" data-item-id="${song.id}"></i>
                        <i class="bi bi-arrow-return-right" onclick="playSongLast(event)" data-item-id="${song.id}"></i>
                    </div>
                </div>`
        }

        for (const album of albumResults.slice(0, 5)) {
            let albumArt = MusicKit.formatArtworkURL(album.artwork, 200, 200);
            document.querySelector('.album-flex').innerHTML += `
                <div class="album" onclick="playAlbum(event)">
                    <div id="album-info">${album.artistName} - ${album.name}</div>
                    <img id="album-art" src="${albumArt}" data-item-id="${album.id}"></img>
                </div>`;
        }

        for (const artist of artistResults.slice(0, 5)) {
            document.querySelector('.artist-flex').innerHTML += `
                <div class="artist-result" data-item-id=${artist.id}>${artist.name}<br><a href="${artist.url}" target="blank">View on Apple Music</a></div>`
        }

        for (const playlist of playlistResults.slice(0, 5)) {
            if (playlist.artwork) {
                let playlistArt = MusicKit.formatArtworkURL(playlist.artwork, 200, 200);
                document.querySelector('.playlist-flex').innerHTML += `
                <div class="playlist" onclick="playPlaylist(event)">
                    <div id="playlist-info">${playlist.name}</div>
                    <img id="playlist-art" src="${playlistArt}" data-item-id="${playlist.id}"></img>
                </div>`;
            } else {
                document.querySelector('.playlist-flex').innerHTML += `
                <div class="playlist" onclick="playPlaylist(event)">
                    <div id="playlist-info-no-art">${playlist.name}</div>
                    <img id="playlist-art" src="images/jouez-icon.png" data-item-id="${playlist.id}" style="display: none;"></img>
                </div>`;
            }
        }

        for (const video of videoResults.slice(0, 3)) {
            document.querySelector('.music-video-flex').innerHTML += `
                <div class="music-video-result" data-item-id=${video.id}>
                    <img src="${MusicKit.formatArtworkURL(video.artwork, 300, 200)}">
                    <div class="music-video-info">${video.name} - ${video.artistName}</div>
                </div>`
        }
        
        searchResultView.style.display = "grid";
    });
}

// const getArtistInfo = (ev) => {
//     const artistID = ev.currentTarget.dataset.itemId;
//     const artist = music.api.artist(artistID);
//     const artistURL = artist.url;
//     console.log(artist, artistURL);
//     window.open(artistURL, 'blank');
// }

const playAlbum = (ev) => {
    console.log(ev);
    music.setQueue({ album: ev.target.dataset.itemId }).then(function(queue) {
        console.log(queue);
        music.player.play();
    });
}

const playSong = (ev) => {
    console.log(ev);
    music.setQueue({ song: ev.target.dataset.itemId }).then(function(queue) {
        console.log(queue);
        music.player.play();
    });
}

const playSongNext = (ev) => {
    console.log(ev);
    music.playNext({ song: ev.target.dataset.itemId }).then(function(queue) {
        console.log(queue);
    });
}

const playSongLast = (ev) => {
    console.log(ev);
    music.playLater({ song: ev.target.dataset.itemId }).then(function(queue) {
        console.log(queue);
    });
}

const playPlaylist = (ev) => {
    console.log(ev);
    music.setQueue({ playlist: ev.target.dataset.itemId }).then(function(queue) {
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
    nowPlayingAlbum.innerHTML = newMediaItem.albumName;
    nowPlayingArtwork.src = MusicKit.formatArtworkURL(newMediaItem.artwork, 60, 60);
}

music.addEventListener(MusicKit.Events.mediaItemDidChange, updateNowPlaying);
music.addEventListener(MusicKit.Events.mediaItemDidChange, updateQueue);
music.addEventListener(MusicKit.Events.queueItemsDidChange, updateQueue);
music.addEventListener(MusicKit.Events.queuePositionDidChange, updateQueue);

// authButton.addEventListener('click', authorizeUser);



