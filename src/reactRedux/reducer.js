const initialState = {
  candidate: {},
};

export const candidateReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SELECTCANDIDATE":
      return {
        ...state,
        candidate: action.payload,
      };
    default:
      return state;
  }
};
