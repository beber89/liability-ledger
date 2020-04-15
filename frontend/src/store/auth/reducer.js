import { updateObject } from "../utility";
import { SET_KEYS,
  SET_CONTRACT_OBJECT,
  SET_CONTRACT_ADDRESS,
 } from "./actionTypes";

const initialState = {
  data: {},
};

const reducer = (state = initialState, action) => {
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
