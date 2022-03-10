import * as React from 'react';
import pLimit from 'p-limit';
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
  React.useEffect(() => {
    const reqList: any = [];
    const limit = pLimit(3);
    Array.from({ length: 20 }, (_, key) => {
      reqList.push(limit(() => request(`http://localhost:8090/api/test?t=${key}`)));
    });
    Promise.allSettled(reqList).then((res) => {
      console.log('res', res);
    });
  }, []);

  return (
    <div>
      <p>chart page</p>
    </div>
  );
};

export default Chart;
