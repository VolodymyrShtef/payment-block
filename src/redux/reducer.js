import initialData from "./initial";

const reducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case "card/add":
      return [...state, payload];
    default:
      return state;
  }
};

export default reducer;
