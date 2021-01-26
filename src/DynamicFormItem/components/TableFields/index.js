import React, { Component, Fragment } from 'react';
import { Table, Tabs, Form } from 'antd';

const { TabPane } = Tabs;

export default function TableFields(props) {
  const { formData, fields } = props;
  const tableFields = formData.tableFields || [];

  // 自定义关联表信息组件
  const resource = formData.resourceName;
  const columns = tableFields.length
    ? Object.keys(tableFields[0]).map(item => {
        return {
          title: item,
          dataIndex: item,
          key: item,
        };
      })
    : [];
  const relatedType = 2;
  return relatedType === 1 ? (
    <Tabs className="table-info">
      {resource
        ? resource.split(',').map((item, idx) => (
            <TabPane tab={item} key={idx}>
              <Table
                key={idx}
                dataSource={tableFields}
                columns={columns}
                bordered
                size="small"
                rowKey={idx}
                pagination={false}
              />
            </TabPane>
          ))
        : null}
    </Tabs>
  ) : tableFields.length ? (
    <Form.Item style={{ width: '80%' }}>
      {/*<p style={{height: 46, marginBottom: 16, paddingLeft: 180, lineHeight: '46px', color: '#1890ff'}}>自定义</p>*/}
      <Table
        className="table-info"
        dataSource={tableFields}
        columns={columns}
        bordered
        size="small"
        rowKey="colname"
        pagination={false}
      />
    </Form.Item>
  ) : null;
}
