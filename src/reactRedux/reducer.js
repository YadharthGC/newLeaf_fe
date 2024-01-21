const initialState = {
  candidate: {},
  edit: false,
};

export const candidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECTCANDIDATE":
      return {
        ...state,
        candidate: action.payload,
      };
    case "SETEDIT":
      return {
        ...state,
        edit: true,
      };
    default:
      return state;
  }
};
