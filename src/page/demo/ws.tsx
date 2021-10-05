import React, { useState } from 'react';
import useWebSocket from '../../components/useWebSocket';

const LoginStatus = 'Login';

const App = () => {
  const [loginState, setloginState] = useState(true);

  const formatWsData = ({ type, data }: any) => (type === 'common' ? data : []);

  const [data] = useWebSocket({
    url: 'ws:localhost:8090/ws/api',
    connect: loginState,
    format: formatWsData,
  });

  console.log('data', data);
  return (
    <div>
      <button onClick={() => setloginState(!loginState)}>click</button>
    </div>
  );
};
export default App;
