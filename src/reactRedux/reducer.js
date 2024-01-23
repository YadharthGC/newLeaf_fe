const initialState = {
  admin: "",
  adminID: "",
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
    case "SETADMIN":
      return {
        ...state,
        admin: action.payload,
      };
    case "SETADMINID":
      return {
        ...state,
        adminID: action.payload,
      };
    default:
      return state;
  }
};
