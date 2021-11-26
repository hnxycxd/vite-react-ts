const fetchData = (action, dispatch) => {
  fetch('http://localhost:8090/koa/get')
    .then((res) => res.json)
    .then((res) => {
      dispatch({ type: 'setState', payload: { data: res.data } });
    });
};
