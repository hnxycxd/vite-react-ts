import React, { useState } from 'react';

const useStore = (reducer, initState, saga) => {
  const [state, setState] = useState(initState);

  const dispatch = (action) => {
    if (
      Object.prototype.toString.call(saga) === '[object Object]' &&
      action.type in saga &&
      typeof saga[action.type] === 'function'
    ) {
      saga[action.type](action, dispatch);
      return;
    }

    setState(reducer(state, action));
  };

  return [state, dispatch];
};

export default useStore;
