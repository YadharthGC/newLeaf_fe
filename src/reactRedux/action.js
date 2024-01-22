export const funSelectCandidate = (data) => {
  return {
    type: "SELECTCANDIDATE",
    payload: data,
  };
};

export const funEdit = (data) => {
  return {
    type: "SETEDIT",
    payload: data,
  };
};

export const funAdmin = (data) => {
  return {
    type: "SETADMIN",
    payload: data,
  };
};
