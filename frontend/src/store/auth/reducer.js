import { updateObject } from "../utility";
import { SET_KEYS, 
 } from "./actionTypes";

const initialState = {
  data: {},
};

const setKeys = (state, action) => {
  return updateObject(state, {data: action.data});
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KEYS:
      return setKeys(state, action);
    default:
      return state;
  }
};

export default reducer;
