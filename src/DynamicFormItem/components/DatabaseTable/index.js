/**
 * @author      mlf
 * @date        2020-09-02
 * @description
 */

import React, {
  Component,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import { Input, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableFields from '../TableFields';
import DatabaseTableModal from './DatabaseTableModal';

export default function DatabaseTable(props) {
  const {
    options,
    label,
    name,
    rules,
    fields,
    formData,
    form,
    style,
    hidden,
    colon,
  } = props;

  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([formData.tableXmlid]);

  const dbname = formData.dbname || null;

  const handleTableSelect = useCallback((key, rows) => {
    if (!rows.length) {
      return;
    }
    setVisible(false);
    setSelectedRowKeys(key);
    const data = {
      tableXmlid: rows[0].rowcode,
      tableFields: [
        {
          colcnname: '雇工标识',
          colname: 'EMPLOYEE_ID',
          colxmlid: '0c63c164891d325cf7a4a9cacaa26b25',
          datatype: 'DECIMAL',
          focus: 0,
          length: null,
          tablexmlid: 'a5b161ecb2dcada936980cc56cefce58',
        },
        {
          colcnname: '雇工名称',
          colname: 'EMPLOYEE_NAME',
          colxmlid: '0eeb28ba5f0c6c943d4a2f616073cc70',
          datatype: 'VARCHAR',
          focus: 0,
          length: '20',
          tablexmlid: 'd25fdb1cf94f604ec22a8514221050e4',
        },
        {
          colcnname: '身份卡片',
          colname: 'IDENTITY_CARD',
          colxmlid: '89ae30dccabe3d0396aee54cf22de96f',
          datatype: 'VARCHAR',
          focus: 0,
          length: '18',
          tablexmlid: 'd25fdb1cf94f604ec22a8514221050e4',
        },
        {
          colcnname: '电子邮箱',
          colname: 'EMAIL',
          colxmlid: '9012d19a315ec61a8105f57d97923390',
          datatype: 'VARCHAR',
          focus: 0,
          length: '50',
          tablexmlid: 'd25fdb1cf94f604ec22a8514221050e4',
        },
        {
          colcnname: '座机',
          colname: 'PHONE',
          colxmlid: '5846bd4d4f762cc02b10fe5e2209e196',
          datatype: 'VARCHAR',
          focus: 0,
          length: '15',
          tablexmlid: 'd25fdb1cf94f604ec22a8514221050e4',
        },
        {
          colcnname: '日期号码',
          colname: 'DATE_NO',
          colxmlid: 'b6099b83c71ab5132c33af92eca03dd7',
          datatype: 'STRING',
          focus: 0,
          length: null,
          tablexmlid: 'd25fdb1cf94f604ec22a8514221050e4',
        },
      ],
    };
    form.setFieldsValue({
      tableName: rows[0].rowname,
      tableXmlid: rows[0].rowcode,
    });
    props.getValue(data);
  }, []);

  return (
    <Fragment>
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        style={style}
        hidden={hidden}
        colon={colon}
        {...fields}
      >
        <Input
          disabled
          placeholder="请选择表名称"
          addonAfter={<PlusOutlined onClick={() => setVisible(true)} />}
        />
      </Form.Item>
      <TableFields formData={formData} fields={fields} />
      {visible && (
        <DatabaseTableModal
          visible={visible}
          dbname={dbname}
          handleCancel={() => setVisible(false)}
          handleSelect={handleTableSelect}
          selectedRowKeys={selectedRowKeys}
          {...props}
        />
      )}
    </Fragment>
  );
}
