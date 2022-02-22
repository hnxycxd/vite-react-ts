import * as React from 'react';
// import moment from 'moment';
import { Button } from 'antd';
import 'moment/locale/zh-cn';
// import locale from 'antd/es/date-picker/locale/zh_CN';
// import store from 'store';
import useStore from 'components/useStore';
import saga from './saga';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setState':
      return { ...state, ...action.payload };
    default:
  }
};

const initState = {
  age: 'zs',
};

const Index = () => {
  const [state, dispatch] = useStore(reducer, initState, saga);
  // const [rState, rdispatch] = React.useReducer(reducer, initState);

  return (
    <>
      <Button
        onClick={() => {
          dispatch({ type: 'fetchData', payload: { age: Math.random() } });
        }}
      >
        btn
      </Button>
      <div>{state.age}</div>
    </>
  );
};

export default Index;
