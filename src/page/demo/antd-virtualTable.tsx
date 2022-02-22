import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';
import './style.css';
import { ColumnsType } from 'antd/lib/table/interface.d';

function VirtualTable(props: any) {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns?.filter(({ width }: any) => !width).length as number;
  const mergedColumns = columns?.map((column: any) => {
    if (column.width) {
      return column;
    }

    return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
  });
  const gridRef = useRef<any>();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData: any, { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 16
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        bordered
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
} // Usage

const columns: ColumnsType = [
  {
    title: 'A',
    dataIndex: 'key',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'B',
    dataIndex: 'key',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'C',
    dataIndex: 'key',
    width: 400,
  },
  {
    title: 'D',
    dataIndex: 'key',
    width: 700,
  },
  {
    title: 'E',
    dataIndex: 'key',
    width: 200,
  },
  {
    title: 'F',
    dataIndex: 'key',
    width: 100,
  },
];
const data = Array.from(
  {
    length: 100,
  },
  (_, key) => {
    const obj: any = { key };
    if (key < 2) {
      obj.children = [{ key: `${key}-1` }];
    }
    if (key === 2) {
      obj.children = [{ key: `${key}-2`, children: [{ key: `${key}-3` }] }];
    }
    return obj;
  }
);

const VTable = () => {
  console.log('data', data);
  console.log('columns', columns);

  return (
    <div style={{ width: '1500px', overflow: 'hidden' }}>
      {/* <VirtualTable
        columns={columns}
        dataSource={data}
        scroll={{
          y: 300,
          x: '100vw',
        }}
      /> */}
      <Table columns={columns} dataSource={data} bordered scroll={{ y: 400 }} pagination={false} />
    </div>
  );
};
export default VTable;
