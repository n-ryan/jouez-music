const libraryView = document.querySelector('#library-view');
const albumsTab = document.querySelector('#albums-tab');
const artistsTab = document.querySelector('#artists-tab');
const songsTab = document.querySelector('#songs-tab');
const playlistsTab = document.querySelector('#playlists-tab');


const showAlbumsView = () => {
    console.log('showing albums view');
}

const showArtistsView = () => {
    console.log('showing artists view');
}

const showSongsView = () => {
    console.log('showing songs view');
}

const showPlaylistsView = () => {
    console.log('showing playlists view');
}

albumsTab.addEventListener('click', showAlbumsView);
artistsTab.addEventListener('click', showArtistsView);
songsTab.addEventListener('click', showSongsView);
playlistsTab.addEventListener('click', showPlaylistsView);



