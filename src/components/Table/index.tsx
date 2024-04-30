import React from "react";
import { Pagination, Table } from "antd";
import "./index.scss";

interface DataType {
  data: any[];
  totalCount: number;
  onPaginationChange: (page: number) => void;
  columns: any;
}

const CustomTable: React.FC<DataType> = ({
  data,
  totalCount,
  onPaginationChange,
  columns,
}) => (
  <>
    <Table dataSource={data} pagination={false} columns={columns} />
    <div className="pagination-container">
      <Pagination
        defaultCurrent={1}
        total={totalCount}
        onChange={onPaginationChange}
      />
    </div>
  </>
);

export default CustomTable;
