import * as React from 'react';
// import moment from 'moment';
import { Button } from 'antd';
import 'moment/locale/zh-cn';
// import locale from 'antd/es/date-picker/locale/zh_CN';
import store from 'store';

const reducer = (state: any, action: any) => ({ ...state, ...action });
const initState = {
  name: 'zs',
};

const Index = () => {
  const [n, setN] = React.useState(store.getState().n);
  const [state, dispatch] = React.useReducer(reducer, initState);

  // store.subscribe(() => {
  //   setN(store.getState().n);
  // });

  return (
    <>
      <Button
        onClick={() => {
          store.dispatch({ type: 'aaa', payload: { aa: 'aa' } });
        }}
      >
        btn
      </Button>
      <div>{n}</div>
    </>
  );
};

export default Index;
