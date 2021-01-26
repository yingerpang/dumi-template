import React, {
  Component,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Modal, Button, Table } from 'antd';

const columns = [
  {
    title: '表名称',
    dataIndex: 'rowcode',
    key: 'rowcode',
    //className: "col-100 td-ellipsis",
    render: text => <span title={text}>{text}</span>,
  },
  {
    title: '中文名称',
    dataIndex: 'rowname',
    key: 'rowname',
    //className: "col-120 td-ellipsis",
    render: text => <span title={text}>{text}</span>,
  },
];

export default function DatabaseTableModal(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState(props.selectedRowKeys);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { visible, handleCancel, dbname } = props;

  const confirmSelect = () => {
    props.handleCancel();
    props.handleSelect(selectedRowKeys, selectedRows);
  };

  const handleTableSelect = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleTableSelect,
    type: 'radio',
  };

  const dataSource = [
    {
      remark: null,
      rowcode: 'METADB',
      rowname: '元数据库',
    },
    {
      remark: null,
      rowcode: 'METADBS',
      rowname: '元数据库2',
    },
    {
      remark: null,
      rowcode: 'DM',
      rowname: '达梦',
    },
    {
      remark: null,
      rowcode: 'hive_dev_test',
      rowname: '测试_生产业务库',
    },
    {
      remark: null,
      rowcode: 'testDM',
      rowname: '测试组达梦',
    },
  ];

  return (
    <Modal
      className="c-modal"
      title="请选择数据库表"
      visible={visible}
      onOk={confirmSelect}
      onCancel={handleCancel}
      maskClosable={false}
      width={680}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={confirmSelect}>
          确定
        </Button>,
      ]}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        size="small"
        rowKey="rowcode"
        rowSelection={rowSelection}
        pagination={false}
      />
    </Modal>
  );
}
