# use-spotify [![npm version](https://badge.fury.io/js/use-spotify.svg)](https://badge.fury.io/js/use-spotify) 

React hooks for the Spotify Web API

## Installation

```shell
yarn add use-spotify

npm install use-spotify
```

## Usage

1. Wrap your components with a `SpotifyApiProvider`.
2. Consume the `useSpotify` or `useSpotifyLazy` hooks.

## Examples 

```typescript jsx
import { useSpotify } from "use-spotify";

const App = () => {
    return (
        <SpotifyApiProvider accessToken={'token goes here'}>
            <MyTopArtists/>
            <Search />
        </SpotifyApiProvider>
    );
};
```

```typescript jsx
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

```typescript jsx
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

```typescript jsx
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