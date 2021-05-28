const mainView = document.querySelector('main');

const getLibraryView = (ev) => {
    console.log("loading library view");
    mainView.innerHTML = `
        <h1>Your Library</h1>
        <div id="library-albums-grid"></div>`;
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
            <button type="button" class="btn btn-primary">
                <i class="bi bi-search"></i>
            </button>
        </div>`;
};

const getGeniusView = (ev) => {
    console.log("loading genius view");
    mainView.innerHTML = `
        <h1>Playlist Genius</h1>`;
};

const getWelcomeView = () => {
    console.log('showing the welcome view');
};

if (!isSignedIn) {
    getWelcomeView();
} else {
    getLibraryView();
};