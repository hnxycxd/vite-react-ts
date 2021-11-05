import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const reducer = (state: any, action: any) => {
  console.log('action', action);
  return { ...state, n: Math.random() };
};
const initState = { name: 'april' };

const myLogger =
  ({ getState }: any) =>
  (next: any) =>
  (action: any) => {
    console.log('next', next);
    // console.log('prev state', getState());
    // console.log('action', action);
    const returnValue = next(action);
    // console.log('next state', getState());
    return returnValue;
  };

const store = createStore(reducer, initState, applyMiddleware(logger));

export default store;
