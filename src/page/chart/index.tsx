import React, { useEffect, useState } from 'react';
// import pLimit from 'p-limit';
// import { Image } from 'antd';
// import { getPageName } from 'src/utils';
// import imgs from 'assets/img/test.png';

const request = (url: string) =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

const Chart = () => {
  // React.useEffect(() => {
  //   const reqList: any = [];
  //   const limit = pLimit(3);
  //   Array.from({ length: 20 }, (_, key) => {
  //     reqList.push(limit(() => request(`http://localhost:8090/api/test?t=${key}`)));
  //   });
  //   Promise.allSettled(reqList).then((res) => {
  //     console.log('res', res);
  //   });
  // }, []);

  const [state, setState] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setState((prev) => prev + 1);
    }, 1000);
  }, []);

  return (
    <div>
      <p>chart page{state}</p>
    </div>
  );
};

export default Chart;
