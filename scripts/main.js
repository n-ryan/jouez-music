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
    } else {
        music.unauthorize();
        isSignedIn = false;
        authButton.innerHTML = "Sign In to Apple Music";
    }
};

const getLibraryAlbums = () => {
    music.api.library.albums({ limit: 100, offset: 0 }).then(function(results) {
        let libraryAlbums = results;
        console.log(libraryAlbums);
        for (album of libraryAlbums) {
            let albumArt = MusicKit.formatArtworkURL(album.artwork, 200, 200);
            console.log(albumArt);
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

const playAlbum = (ev) => {
    console.log(ev);
    music.setQueue({ album: ev.target.dataset.itemId }).then(function(queue) {
        console.log(queue);
    });
}

authButton.addEventListener('click', authorizeUser);



