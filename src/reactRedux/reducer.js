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
        edit: action.payload,
      };
    default:
      return state;
  }
};
