import React, { useState } from 'react';
import { Form, Button, Input, Radio, Table, Tag } from 'antd';
import './style.less';

const initialValues = { weightUnit: 'g' };
const columns = [
  // { dataIndex: 'name', title: '名称' },
  { dataIndex: 'price', title: '售价' },
  {
    dataIndex: 'weight',
    title: '重量',
    render: (text: String, record: IDataItem) => <span>{`${text} ${record.weightUnit}`}</span>,
  },
  {
    dataIndex: 'realPrice',
    title: '价格/斤',
    render: (text: number) => <Tag color="blue">{text.toFixed(2)}</Tag>,
  },
  { dataIndex: 'remark', title: '备注' },
];

interface IDataItem {
  key?: React.Key;
  name?: string;
  price: number;
  weight: number;
  realPrice?: number;
  weightUnit: string;
  remark?: string;
}

const Price: React.FC = () => {
  const [dataSource, setDataSource] = useState<IDataItem[]>([]);

  const onFinish = (values: IDataItem) => {
    let newData = [...dataSource];
    newData.push({ ...values, key: newData.length + 1 });
    newData = newData
      .map((item: IDataItem) => {
        const weight = item.weightUnit === 'kg' ? item.weight * 1000 : item.weight;
        item.realPrice = (item.price * 500) / weight;
        return item;
      })
      .sort((a: IDataItem, b: IDataItem) => (a.realPrice as number) - (b.realPrice as number));
    setDataSource(newData);
  };

  const addTestData = () => {
    const obj = { price: Math.random() * 100, weight: Math.random() * 100, weightUnit: 'g' };
    onFinish(obj);
  };

  const validatorNumber = (rule: any, value: any, callback: any) => {
    if (value && !/^[0-9]*$/.test(value)) {
      callback('请输入数字');
    } else {
      callback();
    }
  };

  return (
    <div className="price">
      <Form
        name="basic"
        colon={false}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        initialValues={initialValues}
        className="price_form"
        autoComplete="off"
      >
        {/* <Form.Item label="名称" name="name">
          <Input placeholder="什么东西" />
        </Form.Item> */}
        <Form.Item
          label="售价"
          name="price"
          rules={[
            { required: true, message: '价格你都不填，怎么计算!' },
            { validator: validatorNumber },
          ]}
        >
          <Input placeholder="多少钱" suffix="元" />
        </Form.Item>
        <Form.Item
          label="重量"
          name="weight"
          rules={[{ required: true, message: '哎呀，这个也要填!' }, { validator: validatorNumber }]}
        >
          <Input placeholder="多重" />
        </Form.Item>
        <Form.Item label="单位" name="weightUnit">
          <Radio.Group>
            <Radio value="g">g</Radio>
            <Radio value="kg">kg</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input placeholder="随便写点" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button htmlType="submit" type="primary">
            添加
          </Button>
          <Button onClick={addTestData} type="primary">
            add test data
          </Button>
        </Form.Item>
      </Form>

      <div className="table_con">
        <Table
          bordered
          className="table"
          columns={columns}
          pagination={false}
          dataSource={dataSource}
        />
      </div>
    </div>
  );
};

export default Price;
