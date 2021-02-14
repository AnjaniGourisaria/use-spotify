import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { FunctionKeys } from 'utility-types';

export type SpotifyApiContextInterface = {
    spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
};

export const SpotifyApiContext = React.createContext<
    Partial<SpotifyApiContextInterface>
    >({});

export interface SpotifyApiProviderProps {
    accessToken: string;
    children?: React.ReactNode;
}

export const SpotifyApiProvider = (props: SpotifyApiProviderProps) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.accessToken);

  return (
    <SpotifyApiContext.Provider value={{ spotifyApi }}>
      {props.children}
    </SpotifyApiContext.Provider>
  );
};

export const useSpotify = (
  method: FunctionKeys<SpotifyWebApi.SpotifyWebApiJs>,
  options = {},
  ...args
) => {
  const { spotifyApi } = useContext(SpotifyApiContext);

  const [res, setRes] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    if (args) {
      spotifyApi[method](...args, options, (error, data) => {
        setRes({
          data,
          error,
          loading: false,
        });
      });
    } else {
      spotifyApi[method](options, (error, data) => {
        setRes({
          data,
          error,
          loading: false,
        });
      });
    }
  }, []);

  return res;
};

export const useSpotifyLazy = (
  method: FunctionKeys<SpotifyWebApi.SpotifyWebApiJs>,
  options = {},
  ...args
) => {
  const { spotifyApi } = useContext(SpotifyApiContext);

  const [res, setRes] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const callback = useCallback(async (overrideOptions?, ...overrideArgs) => {
    let data;
    let error;

    try {
      if (overrideArgs || args) {
        data = await spotifyApi[method](...(overrideArgs || args), overrideOptions || options);
      } else {
        data = await spotifyApi[method](overrideOptions);
      }
    } catch (err) {
      error = err;
    }

    setRes({
      data,
      error,
      loading: false,
    });

    return { data, error, loading: false };
  }, []);

  return [callback, res];
};
