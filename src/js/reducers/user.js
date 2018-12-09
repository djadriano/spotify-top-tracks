const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SAVE':
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
