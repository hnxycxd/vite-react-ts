import React, { useEffect } from 'react';
import styles from './style.module.scss';

const Demo = () => {
  useEffect(() => {
    const _arr = [3, 4, 5, 6, 7, 8, 9]; //len = 7;
    const _num = 9; //index

    function findNum(arr: number[], num: number) {
      debugger;
      let min_index = 0;
      let max_index = arr.length - 1;
      let resultIndex;
      while (arr[min_index] < arr[max_index]) {
        let mid_index = Math.floor((max_index - min_index) / 2);
        if (num < arr[mid_index]) {
          max_index = mid_index;
        } else if (num > arr[mid_index]) {
          min_index = mid_index;
        } else {
          resultIndex = mid_index;
          break;
        }
      }
      return resultIndex;
    }

    const index = findNum(_arr, _num);
    console.log('index', index);
  });
  return <div className={styles.demoPage}>aa</div>;
};

export default Demo;
