export const funSelectCandidate = (data) => {
  console.log(data);
  return {
    type: "SELECTCANDIDATE",
    payload: data,
  };
};
