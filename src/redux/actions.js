const addNewCard = ({ number, holder, cvv, expM, expY, issuer }) => {
  return {
    type: "card/add",
    payload: {
      number: number,
      holder: holder,
      cvv: cvv,
      expM: expM,
      expY: expY,
      issuer: issuer,
    },
  };
};

export default addNewCard;
