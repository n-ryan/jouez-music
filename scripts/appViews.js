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
};

const getGeniusView = (ev) => {
    console.log("loading genius view");
};

const getWelcomeView = () => {
    console.log('showing the welcome view');
};

if (!isSignedIn) {
    getWelcomeView();
} else {
    getLibraryView();
};