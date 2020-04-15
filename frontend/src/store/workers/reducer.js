import { updateObject } from "../utility";
import { ADD_WORKER, 
  WORKER_ADDED,
  FINISH_GET_WORKERS,
 } from "./actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false
};

const addWorkerStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const workerAddedSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};
const reducer = (state = initialState, action, stateAuth) => {
  switch (action.type) {
    case ADD_WORKER:
      return addWorkerStart(state, action);
    case WORKER_ADDED:
      return workerAddedSuccess(state, action);
    case FINISH_GET_WORKERS:
      return updateObject(state, { data: action.data});
    default:
      return state;
  }
};

const addWorkerLogic =  () => {

};

export default reducer;
