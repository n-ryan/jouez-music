const mainView = document.querySelector('main');

const getLibraryView = (ev) => {
    console.log("loading library view");
    mainView.innerHTML = `
        <h1>Your Library</h1>
        <ul class="nav nav-pills">
            <li class="nav-item">
                <a class="nav-link active" id="albums-tab" onclick="showAlbumsView(event)" href="#">Albums</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="artists-tab" onclick="showArtistsView(event)" href="#">Artists</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="songs-tab" onclick="showSongsView(event)" href="#">Songs</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="playlists-tab" onclick="showPlaylistsView(event)" href="#">Playlists</a>
            </li>
        </ul>
        <div class="library-albums-grid" id="library-view"></div>
        <button type="button" class="btn btn-primary" id="load-more" onclick="loadMore(event)" style="display: none;">Load more...</button>`;
    getLibraryAlbums();
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

const getQueueView = (ev) => {
    console.log("loading queue view");
    mainView.innerHTML = `
        <h1>Queue</h1>
        <div class="queue-view"><h3>Loading queue...</h3><div>`;
    displayQueue();
};

const getWelcomeView = () => {
    console.log('showing the welcome view');
    mainView.innerHTML = `
        <h1>Welcome to Jouez Music!</h1>
        <h3>Jouez is a better way to enjoy your Apple Music library.</h3>
        <h3>To get started, log in to your Apple ID using the button above.</h3>
        <button type="button" class="btn btn-primary" id="welcome" style="display: none;" onclick="welcomeIn(event)">Let's get started!</button>`;
};

const welcomeIn = (ev) => {
    window.location.reload();
}

if (!music.isAuthorized) {
    getWelcomeView();
} else {
    getLibraryView();
};

music.addEventListener(MusicKit.Events.authorizationStatusDidChange, function() {
    if (music.isAuthorized) {
        document.querySelector('#welcome').style.display = "inherit";
    }
});