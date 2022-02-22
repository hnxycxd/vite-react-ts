import {
  useState,
  // Dispatch, Reducer, ReducerState, ReducerAction
} from 'react';

type Reducer<S, A> = (state: S, action: A) => S;
type ReducerState<R> = R extends Reducer<infer S, any> ? S : never;
type ReducerAction<R> = R extends Reducer<any, infer A> ? A : never;

type saga<R> = Record<
  string,
  (
    action: ReducerAction<R>,
    dispatch: (action: ReducerAction<R>) => void,
    state: ReducerState<R>
  ) => void
>;
type Store = <R extends Reducer<any, any>>(
  reducer: R,
  state: ReducerState<R>,
  saga: saga<R>
) => [ReducerState<R>, (action: ReducerAction<R>) => void];

const useStore: Store = (reducer, initState, saga) => {
  const [state, setState] = useState(initState);

  const dispatch = (action: ReducerAction<typeof reducer>) => {
    if (
      Object.prototype.toString.call(saga) === '[object Object]' &&
      action.type in saga &&
      typeof saga[action.type] === 'function'
    ) {
      saga[action.type](action, dispatch, state);
      return;
    }
    setState(reducer(state, action));
  };

  return [state, dispatch];
};

export default useStore;
