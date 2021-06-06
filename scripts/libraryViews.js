const libraryView = document.querySelector('#library-view');
const albumsTab = document.querySelector('#albums-tab');
const artistsTab = document.querySelector('#artists-tab');
const songsTab = document.querySelector('#songs-tab');
const playlistsTab = document.querySelector('#playlists-tab');

const makeTabsInactive = () => {
    const activeTabs = document.querySelectorAll('.active');
    for (const tab of activeTabs) {
        tab.classList.remove('active');
    }
}

const showAlbumsView = () => {
    console.log('showing albums view');
    makeTabsInactive();
    albumsTab.classList.add('active');
    libraryView.className = 'library-albums-grid';
    getLibraryAlbums();
}

const showArtistsView = () => {
    console.log('showing artists view');
    makeTabsInactive();
    artistsTab.classList.add('active');
    libraryView.className = 'library-artists';
    getLibraryArtists();
}

const showSongsView = () => {
    console.log('showing songs view');
    makeTabsInactive();
    songsTab.classList.add('active');
    libraryView.className = 'library-songs';
    getLibrarySongs();
}

const showPlaylistsView = () => {
    console.log('showing playlists view');
    makeTabsInactive();
    playlistsTab.classList.add('active');
    libraryView.className = 'library-playlists';
    getLibraryPlaylists();
}



