const addNewCard = (payload) => {
  return {
    type: "card/add",
    payload,
  };
};

export default addNewCard;
