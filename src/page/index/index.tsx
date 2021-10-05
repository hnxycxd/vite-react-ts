import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import usePrev from 'src/components/usePrev';

const Index = (props: any) => {
  const [num, setNumb] = useState(0);
  const prev = usePrev<number>(num);
  return (
    <div>
      <div>
        prev: {prev}, next: {num}
      </div>
      <Button onClick={() => setNumb(Math.random())}>add</Button>
    </div>
  );
};

export default Index;
