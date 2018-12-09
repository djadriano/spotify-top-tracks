import Spotify from 'spotify-web-api-js';

export function fetchRecommendationsTracks() {
  return async (dispatch, getState) => {
    const spotifyApi = new Spotify();
    const userAccessToken = getState().user.data.accessToken;
    const selectedTracks = getState().carousel.selectedTracks;

    if (selectedTracks.length > 0) {
      const selectedTracksPerComma = selectedTracks.map(item => item).join(',');

      if (userAccessToken) {
        spotifyApi.setAccessToken(userAccessToken);

        try {
          let responseRecommendationsTrackskApi = await spotifyApi.getRecommendations({
            seed_tracks: selectedTracksPerComma
          });

          dispatch({
            type: 'CAROUSEL_SET_RECOMMENDATIONS',
            payload: { recommendationsTracks: responseRecommendationsTrackskApi.tracks }
          });
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      dispatch({
        type: 'CAROUSEL_SET_RECOMMENDATIONS',
        payload: { recommendationsTracks: [] }
      });
    }
  };
}

// ----------------------------------------------------------

export function fetchTopTracks() {
  return async (dispatch, getState) => {
    try {
      const spotifyApi = new Spotify();
      const userAccessToken = getState().user.data.accessToken;

      if (userAccessToken) {
        spotifyApi.setAccessToken(userAccessToken);

        let responseTopTrackApi = await spotifyApi.getMyTopTracks({ time_range: 'medium_term' });

        dispatch({
          type: 'CAROUSEL_SET_TOP',
          topTracks: responseTopTrackApi.items
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------

export function setSelectedTracks(trackId = null) {
  return async (dispatch, getState) => {
    if (trackId) {
      return dispatch({
        type: 'CAROUSEL_SET_SELECTED',
        selectedTrack: trackId
      });
    }
  };
}

// ----------------------------------------------------------

export function deleteSelectedTracks(trackId = null) {
  return async (dispatch, getState) => {
    if (trackId) {
      return dispatch({
        type: 'CAROUSEL_DELETE_SELECTED',
        selectedTrack: trackId
      });
    }
  };
}
