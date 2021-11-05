import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
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
    const randomData = Array.from({ length: 1000 }, (_, key) => ({
      key,
      name: CN(2),
      age: Math.random(),
      addr: CN(4),
    }));

    setData(randomData);
    console.log('tableRef', tableRef.current);

    // const tbody = document.querySelector()
  }, []);

  // useEffect(() => {

  // }, [])
  console.log(data);
  return (
    <div className={styles.idx} ref={tableRef}>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 400 }}
        showSorterTooltip={false}
      />
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
