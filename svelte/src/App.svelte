<script>
	MusicKit.configure({
		declarativeMarkup: true,
		developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktMM1o4QlI1MkgifQ.eyJpc3MiOiJXQU44QkRCVlNCIiwiaWF0IjoxNjIxMDM1NTUyLCJleHAiOjE2MzY3NjE2MDB9.vh9Rq2q9VV28w5IrvYGgg_rRxRra6rm4UxrFwXMgbyp2csSJ30SsVrgacV2Nl3IDx51ZKk_BNbuLmRHumqe5QQ',
		debug: true,
		features: ['player-accurate-timing', 'api-data-store', 'api-session-storage', 'api-artist-include'],
		storefrontId: 'us',
		suppressErrorDialog: false,
		app: {
			name: 'Jouez Music',
			build: '0.9'
		}
	});

	let music = MusicKit.getInstance();

	// const authButton = document.querySelector('#authorize');
</script>

<svelte:head>
	<title>Jouez Music</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="styles.css">
</svelte:head>

<header>
	<h1>Jouez Music</h1>
	<button id="apple-music-authorize">Sign In to Apple Music</button>
	<button id="apple-music-unauthorize">Sign Out of Apple Music</button>
</header>

<aside>
	<ul>
		<li>
			<span class="material-icons">library_music</span>
			<a href="">Your Library</a>
		</li>
		<li>
			<span class="material-icons">search</span>
			<a href="">Search</a>
		</li>
		<li>
			<span class="material-icons">settings_suggest</span>
			<a href="">Playlist Genius</a>
		</li>
	</ul>
</aside>

<main>
	<h1>Your Library</h1>
	<button data-apple-music-pause>Pause</button>
	<button data-apple-music-play>Play</button>
	<button data-apple-music-skip-to-next-item>Skip Next</button>
	<button data-apple-music-skip-to-previous-item>Skip Previous</button>
	<button data-apple-music-set-queue="pl.457c8a2477be45038796305712e2d6af">Queue "Megan Thee Stallion Essentials"</button>
	<p data-apple-music-now-playing></p>
</main>

<style>
	
</style>