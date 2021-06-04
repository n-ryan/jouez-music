const mainView = document.querySelector('main');

const getLibraryView = (ev) => {
    console.log("loading library view");
    mainView.innerHTML = `
        <h1>Your Library</h1>
        <ul class="nav nav-pills">
            <li class="nav-item">
                <a class="nav-link active" id="albums-tab" href="#">Albums</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="artists-tab" href="#">Artists</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="songs-tab" href="#">Songs</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="playlists-tab" href="#">Playlists</a>
            </li>
        </ul>
        <div class="library-albums-grid" id="library-view"></div>`;
    getLibraryAlbums();
    document.querySelector('#albums-tab').addEventListener('click', showAlbumsView);
    document.querySelector('#artists-tab').addEventListener('click', showArtistsView);
    document.querySelector('#songs-tab').addEventListener('click', showSongsView);
    document.querySelector('#playlists-tab').addEventListener('click', showPlaylistsView);
};

const getSearchView = (ev) => {
    console.log("loading search view");
    mainView.innerHTML = `
        <h1>Search</h1>
        <div class="input-group">
            <div class="form-outline">
                <input type="search" id="music-search" class="form-control" placeholder="Search for music here..." />
            </div>
            <button type="button" class="btn btn-primary" onclick="search(event)">
                <i class="bi bi-search"></i>
            </button>
        </div>
        <div class="search-results">
            <div class="song-results"><h3>Songs</h3></div>
            <div class="album-results"><h3>Albums</h3><div class="album-flex"></div></div>
            <div class="artist-results"><h3>Artists</h3><div class="artist-flex"></div></div>
            <div class="playlist-results"><h3>Playlists</h3><div class="playlist-flex"></div></div>
            <div class="music-video-results"><h3>Music Videos</h3><div class="music-video-flex"></div></div>
        </div>`;
    document.querySelector('.search-results').style.display = "none";
};

const getGeniusView = (ev) => {
    console.log("loading genius view");
    mainView.innerHTML = `
        <h1>Playlist Genius</h1>`;
};

const getWelcomeView = () => {
    console.log('showing the welcome view');
    mainView.innerHTML = `
        <h1>Welcome to Jouez Music!</h1>
        <h3>Jouez is a better way to enjoy your Apple Music library.</h3>
        <h3>To get started, log in to your Apple ID using the button above.</h3>`;
};

if (!isSignedIn) {
    getWelcomeView();
} else {
    getLibraryView();
};