import { updateObject } from "../utility";
import { SET_KEYS,
  SET_CONTRACT_ADDRESS,
  SET_CONTRACT_OBJECT
 } from "./actionTypes";

const initialState = {
  data: {},
};

// const setKeys = (state, action) => {
//   return {data: updateObject(state.data, action.data)};
// };

const reducer = (state = initialState, action) => {
  console.log("state");
  console.log(state);

  console.log("action");
  console.log(action);
  switch (action.type) {
    case SET_KEYS:
    case SET_CONTRACT_ADDRESS:
    case SET_CONTRACT_OBJECT:
      return  {data: updateObject(state.data, action.data)};
    default:
      return state;
  }
};

export default reducer;
