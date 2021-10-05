import { useEffect, useRef } from 'react';

type TUsePrev = <T>(value: T) => T;

const usePrev: TUsePrev = (value) => {
  const prev = useRef(value);

  useEffect(() => {
    prev.current = value;
  }, [value]);

  return prev.current;
};

export default usePrev;
