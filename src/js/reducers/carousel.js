const initialState = {
  topTracks: [],
  recommendationsTracks: [],
  selectedTracks: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CAROUSEL_SET_TOP':
      return {
        ...state,
        topTracks: action.topTracks
      };
    case 'CAROUSEL_DELETE_TOP':
      return {
        ...state,
        topTracks: state.topTracks.filter(track => track.id != action.payload.id)
      };
    case 'CAROUSEL_SET_SELECTED':
      return {
        ...state,
        selectedTracks: [action.selectedTrack, ...state.selectedTracks]
      };
    case 'CAROUSEL_DELETE_SELECTED':
      return {
        ...state,
        selectedTracks: state.selectedTracks.filter(track => track != action.selectedTrack)
      };
    case 'CAROUSEL_SET_RECOMMENDATIONS':
      return {
        ...state,
        recommendationsTracks: action.payload.recommendationsTracks
      };
    default:
      return state;
  }
};

export default userReducer;
