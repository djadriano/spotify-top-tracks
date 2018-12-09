import Spotify from 'spotify-web-api-js';

export function saveUserData(userAccessToken = null) {
  return async (dispatch, getState) => {
    try {
      const spotifyApi = new Spotify();

      if (userAccessToken) {
        spotifyApi.setAccessToken(userAccessToken);

        let responseMeApi = await spotifyApi.getMe();
        const userImage = responseMeApi.images.length > 0 ? responseMeApi.images[0].url : null;

        return dispatch({
          type: 'USER_SAVE',
          payload: { accessToken: userAccessToken, image: userImage }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}
