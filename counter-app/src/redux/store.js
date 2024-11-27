import { createStore } from "redux";


const initialState = {
  counter: 0,
  maxValue: 100,
};


const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_BY_ONE":
      return {
        ...state,
        counter: Math.min(state.counter + 1, state.maxValue),
      };
    case "DECREMENT_BY_ONE":
      return {
        ...state,
        counter: Math.max(state.counter - 1, 0),
      };
    case "INCREMENT_BY_FIVE":
      return {
        ...state,
        counter: Math.min(state.counter + 5, state.maxValue),
      };
    case "DECREMENT_BY_FIVE":
      return {
        ...state,
        counter: Math.max(state.counter - 5, 0),
      };
    case "RESET":
      return { ...state, counter: 0 };
    default:
      return state;
  }
};

const store = createStore(counterReducer);

export default store;
