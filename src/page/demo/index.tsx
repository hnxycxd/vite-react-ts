import * as React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

// const quarter = ['03-31', '06-30', '09-30', '12-31'];
const quarter = ['03', '06', '09', '12'];
const y4m2 = 'YYYY-MM';
const params: string[] = [];

const Index = () => {
  const handleDate = (date: any) => {
    let [start, end] = [date[0].format('YYYY-MM'), date[1].format('YYYY-MM')];
    const [startYear] = start.split('-');
    let i = 0;
    while (start <= end) {
      if (i >= quarter.length) {
        i = 0;
      }
      if (start === `${startYear}-${quarter}[${i}]`) {
        params.push(start);
      }
      start = moment(start).add(1, 'M').format(y4m2);
      i++;
    }
    // start = moment(start).add(1, 'M').format(y4m2);

    console.log('date', start, end);
    console.log('params', params);
  };
  return (
    <DatePicker.RangePicker
      allowClear={false}
      picker="month"
      locale={locale}
      onChange={handleDate}
    />
  );
};

export default Index;
