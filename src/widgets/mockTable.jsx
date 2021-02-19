import React, { useRef } from 'react';
import { Button } from 'antd';
import { ProTable, Search, TableContainer, useTable } from 'table-render';

// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
const searchSchema = {
  type: 'object',
  properties: {
    created_at: {
      title: '创建时间',
      type: 'string',
      format: 'date',
      'ui:width': '25%',
    },
    title: {
      title: '标题',
      type: 'string',
      'x-component-props': {},
      name: 'title',
      key: 'title',
      'ui:width': '25%',
    },
    status: {
      title: '状态',
      type: 'string',
      enum: ['null', '0', '1'],
      enumNames: ['全部', '已解决', '未解决'],
      name: 'state',
      key: 'state',
      'ui:width': '25%',
    },
  },
  displayType: 'row',
  showDescIcon: true,
  column: 3,
};
// 配置完全透传antd table
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'state',
    enum: {
      open: '未解决',
      closed: '已解决',
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    render: row => (
      <a
        href="https://x-render.gitee.io/form-render/"
        target="_blank"
        rel="noopener noreferrer"
      >
        查看
      </a>
    ),
  },
];

const searchApi = params => {
  return {
    rows: [
      {
        id: 624748504,
        title: 'mock数据1',
        state: 'closed',
        created_at: '2021-01-12T09:42:56Z',
      },
      {
        id: 624691229,
        title: 'mock数据2',
        state: 'open',
        created_at: '2021-01-15T08:19:22Z',
      },
      {
        id: 624691235,
        title: 'mock数据3',
        state: 'closed',
        created_at: '2021-01-12T08:19:22Z',
      },
      {
        id: 6246912240,
        title: 'mock数据4',
        state: 'open',
        created_at: '2020-12-26T08:19:22Z',
      },
      {
        id: 624691241,
        title: 'mock数据5',
        state: 'closed',
        created_at: '2020-05-26T08:19:22Z',
      },
    ],
    total: 2,
  };
};
const Demo = () => {
  return (
    <TableContainer searchApi={searchApi}>
      <Search schema={searchSchema} />
      <ProTable
        headerTitle="高级表单"
        toolbarRender={() => [
          <Button key="1">查看日志</Button>,
          <Button key="2">导出数据</Button>,
          <Button key="3">创建</Button>,
        ]}
        // 下面全是antd的props
        columns={columns}
        rowKey="id"
      />
    </TableContainer>
  );
};

export default Demo;
