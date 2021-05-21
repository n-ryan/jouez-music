const searchArtist = () => {
    const searchTerm = document.querySelector('#artist-search').value;
    const searchURL = `https://api.music.apple.com/v1/catalog/us/search?term=${searchTerm}&limit=1&types=artists`
    
    fetch(searchURL, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktMM1o4QlI1MkgifQ.eyJpc3MiOiJXQU44QkRCVlNCIiwiaWF0IjoxNjIxMDM1NTUyLCJleHAiOjE2MzY3NjE2MDB9.vh9Rq2q9VV28w5IrvYGgg_rRxRra6rm4UxrFwXMgbyp2csSJ30SsVrgacV2Nl3IDx51ZKk_BNbuLmRHumqe5QQ'
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((artists) => {
            const artist = artists.results.artists.data[0];
            console.log(artist);
            const artistName = artist.attributes.name;
            const artistURL = artist.attributes.url;
            const artistGenres = artist.attributes.genreNames;
            console.log(artistName, artistURL, artistGenres);

            document.querySelector('#search-results').innerHTML = `
            <h1>${artistName}</h1>
            <p>Learn more about ${artistName} at <a href="${artistURL}">Apple Music</a></p>
            <p>${artistGenres}</p>`;
        });

    
};

document.querySelector('#search').onclick = searchArtist;

