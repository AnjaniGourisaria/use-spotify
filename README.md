# use-spotify [![npm version](https://badge.fury.io/js/use-spotify.svg)](https://badge.fury.io/js/use-spotify) 

React hooks for the Spotify Web API.

## Installation

```shell
yarn add use-spotify

npm install use-spotify
```

## Usage

1. Wrap your components with a `SpotifyApiProvider` and pass it a valid access token. Read the [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for more details.
2. Consume the `useSpotify` or `useSpotifyLazy` hooks.

## API

Underneath the hood `use-spotify` utilizes [Spotify Web API JS](https://github.com/JMPerez/spotify-web-api-js).

- The first parameter to the hooks is any spotify method name. 
- The second parameter is options.
- The third parameter is a list of arguments specific to the spotify method. 

Further documentation for each method and its arguments can be found at the [Spotify Web API JS](https://jmperezperez.com/spotify-web-api-js/) documentation or in the [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api/reference/).

```typescript
const result = useSpotify(spotifyMethod, options, ...args)

const [invoke, result] = useSpotifyLazy(spotifyMethod, options, ...args)

await invoke()

await invoke(overrideOption, ...overrideArgs)
```

## Examples 

### Provider

```typescript jsx
import { useSpotify, SpotifyApiProvider } from 'use-spotify';

const App = () => {
    return (
        <SpotifyApiProvider accessToken={'token goes here'}>
            <MyTopArtists/>
            <Search />
        </SpotifyApiProvider>
    );
};
```

### Simple hook usage

```typescript jsx
import { useSpotify } from 'use-spotify';

const MyTopArtists = () => {
    const myTopArtists = useSpotify('getMyTopArtists');
    
    if (myTopArtists.loading) {
        return 'Loading';
    }
    
    return myTopArtists.data.artists.items.map(x => (
        <div key={x.id}>
            {x.name}
        </div>
    ))
}
```

### Passing arguments to a hook


```typescript jsx
import { useSpotify } from 'use-spotify';

const Search = () => {
    const search = useSpotify(
        'search',
        {
            limit: 5,
        },
        'The National',
        ['artist', 'album']
    );

    if (search.loading) {
        return 'Loading';
    }

    return search.data.artists.items.map(x => (
        <div key={x.id}>
            {x.name}
        </div>
    ))
}
```

### Passing arguments to a lazy hook

```typescript jsx
import { useSpotifyLazy } from 'use-spotify';

const SearchLazy = () => {
    const [search, results] = useSpotifyLazy(
        'search',
    );

    useEffect(() => {
        (async () => {
            const searchResults = await search(
                {
                    limit: 5,
                },
                'The National',
                ['artist', 'album']
            );
        })()
    }, [])
    
    if (results.loading) {
        return 'Loading';
    }

    return results.data.artists.items.map(x => (
        <div key={x.id}>
            {x.name}
        </div>
    ))
}
```