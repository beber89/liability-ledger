import { SET_KEYS, 
 } from "./actionTypes";





const setKeysAction = (publicKey, privateKey) => {
  return {
    type: SET_KEYS,
    data: {
      publicKey,
      privateKey
    }
  };
};


export const setKeys = ({publicKey, privateKey}) => {
  return dispatch => {
    dispatch(setKeysAction(publicKey, privateKey));
  };
};