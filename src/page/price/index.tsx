import React, { useState } from 'react';
import { Form, Button, Input, Radio, Table, Tag, Divider } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import * as Types from './types';
import './style.less';

const initialValues = { weightUnit: 'g' };
const columns = (columnsProps: Types.columnsProps): ColumnsType<Types.IDataItem> => [
  { dataIndex: 'name', title: '名称', align: 'center' },
  { dataIndex: 'price', title: '售价', align: 'center' },
  {
    dataIndex: 'weight',
    title: '重量',
    align: 'center',
    render: (text: string, record: Types.IDataItem) => (
      <>
        <span>{text}</span>
        <span>
          {text.includes('*') ? ` (${eval(text)}${record.weightUnit})` : record.weightUnit}
        </span>
      </>
    ),
  },
  {
    dataIndex: 'realPrice',
    title: '价格/斤',
    align: 'center',
    render: (text: number) => <Tag color="blue">{text.toFixed(2)}</Tag>,
  },
  { dataIndex: 'remark', title: '备注', align: 'center' },
  {
    dataIndex: 'handle',
    title: '操作',
    align: 'center',
    render: (text: string, record: Types.IDataItem) => (
      <>
        <a
          onClick={() => columnsProps.handleEdit(record)}
          style={columnsProps.editing ? { color: '#ccc' } : {}}
        >
          编辑
        </a>
        <Divider type="vertical" />
        <a
          onClick={() => columnsProps.handleDelete(record)}
          style={columnsProps.editing ? { color: '#ccc' } : {}}
        >
          删除
        </a>
      </>
    ),
  },
];

const Price: React.FC = () => {
  const [dataSource, setDataSource] = useState<Types.IDataItem[]>([]);
  const [form] = Form.useForm();
  const [currentEditItem, setCurrentEditItem] = useState<Types.IDataItem>();

  const onFinish = (values: Types.IDataItem) => {
    let newData = [...dataSource];
    if (currentEditItem) {
      newData = newData.map((item) => {
        if (item.key === currentEditItem.key) {
          return { ...item, ...values };
        }
        return item;
      });
    } else {
      const newValues = { ...values, key: newData.length + 1 };
      newData.push(newValues);
    }

    newData = newData
      .map((item: Types.IDataItem) => {
        const _weight = eval(String(item.weight));
        const weight = item.weightUnit === 'kg' ? _weight * 1000 : _weight;
        item.realPrice = (item.price * 500) / weight;
        return item;
      })
      .sort(
        (a: Types.IDataItem, b: Types.IDataItem) =>
          (a.realPrice as number) - (b.realPrice as number)
      );
    setDataSource(newData);
    setCurrentEditItem(undefined);
    form.resetFields(['price', 'weight']);
  };

  const handleDelete = (record: Types.IDataItem) => {
    if (currentEditItem) return;
    const newData = dataSource.filter((item: Types.IDataItem) => item.key !== record.key);
    setDataSource(newData);
  };

  const handleEdit = (record: Types.IDataItem) => {
    if (currentEditItem) return;
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      weight: record.weight,
      weightUnit: record.weightUnit,
      remark: record.remark,
    });
    setCurrentEditItem(record);
  };

  const addTestData = () => {
    const obj = { price: Math.random() * 100, weight: Math.random() * 100, weightUnit: 'g' };
    onFinish(obj);
  };

  const validatorWeight = (rule: any, value: string) => {
    if (!value) {
      return Promise.reject();
    }
    const invalid = value.split('*').some((it: String) => isNaN(+it.trim()));
    return new Promise<void>((resolve, reject) => {
      if (invalid) {
        reject('你在写啥, 我看不懂');
      } else {
        resolve();
      }
    });
  };

  const validatorAmount = (rule: any, value: any) => {
    return new Promise<void>((resolve, reject) => {
      if (value && isNaN(+value)) {
        reject('只能填数字, 别乱敲');
      } else {
        resolve();
      }
    });
  };

  return (
    <div className="price">
      <Form
        name="basic"
        colon={false}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        initialValues={initialValues}
        className="price_form"
        autoComplete="off"
      >
        <Form.Item label="名称" name="name">
          <Input placeholder="什么东西" />
        </Form.Item>
        <Form.Item
          label="售价"
          name="price"
          rules={[
            { required: true, message: '价格你都不填，我咋算!' },
            { validator: validatorAmount },
          ]}
        >
          <Input placeholder="多少钱" suffix="元" />
        </Form.Item>
        <Form.Item
          label="重量"
          name="weight"
          rules={[{ required: true, message: '哎呀，这个也要填!' }, { validator: validatorWeight }]}
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
            {currentEditItem ? '更新' : '添加'}
          </Button>
          {/* <Button style={{ marginLeft: 20 }} onClick={addTestData} type="primary">
            add test data
          </Button> */}
        </Form.Item>
      </Form>

      <div className="table_con">
        <Table
          bordered
          className="table"
          columns={columns({ handleDelete, handleEdit, editing: !!currentEditItem })}
          pagination={false}
          dataSource={dataSource}
        />
      </div>
    </div>
  );
};

export default Price;
