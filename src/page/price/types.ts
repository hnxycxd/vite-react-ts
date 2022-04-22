export interface columnsProps {
  handleDelete: (record: IDataItem) => void;
  handleEdit: (record: IDataItem) => void;
  editing: Boolean;
}

export interface IDataItem {
  key?: React.Key;
  name?: string;
  price: number;
  weight: number;
  realPrice?: number;
  weightUnit: string;
  remark?: string;
}
