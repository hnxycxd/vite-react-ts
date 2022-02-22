import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Table, Menu, Card, Button } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CN } from 'utils';
// import usePrev from 'src/components/usePrev';
// import store from 'store';
import styles from './style.module.less';

interface IData {
  key: number;
  name: string;
  age: number;
  addr: string;
  children?: IData[];
}

const Index = (props: any) => {
  const [data, setData] = useState<IData[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: '地址',
      dataIndex: 'addr',
    },
  ];

  useEffect(() => {
    const randomData: IData[] = Array.from({ length: 100 }, (_, key) => ({
      key,
      name: CN(2),
      age: Math.random(),
      addr: CN(4),
    }));
    randomData[0].children = Array.from({ length: 20 }, (_, key) => ({
      key,
      name: CN(3),
      age: Math.random(),
      addr: CN(4),
    }));
    setData(randomData);
    // console.log('tableRef', tableRef.current);

    const tbody = document.querySelector(`.${styles.idx} .ant-table-body`);
    tbody?.addEventListener('scroll', function (e: any) {
      // console.log('scroll e', e.target.scrollTop);
      const scrollTop = e.target.scrollTop;
      if (scrollTop > 800) {
        // data.splice(0, 10);
        setData(data.filter((_, i) => i));
      }
    });
    // console.log('tbody', tbody);
  }, []);

  const renderRow = ({ children, ...otherProps }: any) => {
    return (
      <tr {...otherProps} c-data="a">
        {children}
      </tr>
    );
  };

  // console.log('--routes', routes);
  return (
    <div className={styles.idx} ref={tableRef}>
      index
      <Card title="静夜思">
        <div>床前明月光，疑似地上霜。</div>
        <div>举头望明月，低头思故乡。</div>
      </Card>
      <Button>button</Button>
      {/* <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        components={{
          body: { row: renderRow },
        }}
        scroll={{ y: 400 }}
        showSorterTooltip={false}
      /> */}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  n: state.n,
  name: state.name,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchTableData: (params: any) => dispatch({ type: 'fetch', payload: params }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
