import React, { useRef, useEffect, useState } from 'react';

interface IProps {
  url: string;
  connect: boolean;
  onopen?: (event: any) => void;
  onclose?: (event: any) => void;
  format?: (data: any) => void;
}

const useWebSocket = (props: IProps) => {
  const { url, connect, onopen, onclose, format } = props;
  const wsRef = useRef<WebSocket | null>(null);
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (connect && !wsRef.current) {
      wsRef.current = new WebSocket(url);
      wsRef.current.onopen = onopen || (() => {});
      wsRef.current.onclose = onclose || (() => {});
      wsRef.current.onmessage = (res) => {
        if (res.data !== '连接成功') {
          let resData = JSON.parse(res.data);
          if (format && typeof format === 'function') {
            resData = format(resData);
          }
          setData(resData);
        }
      };
    } else if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect, url]);

  return [data];
};

export default useWebSocket;
