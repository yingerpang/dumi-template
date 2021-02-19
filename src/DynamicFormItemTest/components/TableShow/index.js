import React, { Fragment } from 'react';
import TableFields from '../TableFields';

function TableShow(props) {
  const { formData, fields, hidden, required, label, name } = props;
  // const formData = {
  //   tableFields : [
  //     {colcnname: "雇工标识",colname: "EMPLOYEE_ID",colxmlid: "0c63c164891d325cf7a4a9cacaa26b25",datatype: "DECIMAL",focus: 0,length: null,tablexmlid: "a5b161ecb2dcada936980cc56cefce58"},
  //     {colcnname: "雇工名称",colname: "EMPLOYEE_NAME",colxmlid: "0eeb28ba5f0c6c943d4a2f616073cc70",datatype: "VARCHAR",focus: 0,length: "20",tablexmlid: "d25fdb1cf94f604ec22a8514221050e4"},
  //     {colcnname: "身份卡片",colname: "IDENTITY_CARD",colxmlid: "89ae30dccabe3d0396aee54cf22de96f",datatype: "VARCHAR",focus: 0,length: "18",tablexmlid: "d25fdb1cf94f604ec22a8514221050e4"},
  //     {colcnname: "电子邮箱",colname: "EMAIL",colxmlid: "9012d19a315ec61a8105f57d97923390",datatype: "VARCHAR",focus: 0,length: "50",tablexmlid: "d25fdb1cf94f604ec22a8514221050e4"},
  //     {colcnname: "座机",colname: "PHONE",colxmlid: "5846bd4d4f762cc02b10fe5e2209e196",datatype: "VARCHAR",focus: 0,length: "15",tablexmlid: "d25fdb1cf94f604ec22a8514221050e4"},
  //     {colcnname: "日期号码",colname: "DATE_NO",colxmlid: "b6099b83c71ab5132c33af92eca03dd7",datatype: "STRING",focus: 0,length: null,tablexmlid: "d25fdb1cf94f604ec22a8514221050e4"}
  //    ]
  // }
  return (
    <Fragment>
      <div
        className={`show-item ${hidden ? 'show-item-hidden' : null}`}
        key={name}
      >
        <p className={`show-item-label ${required ? 'required' : ''}`}>
          {label || ''}:
        </p>
        <p className="markdown-body">{formData[name]}</p>
      </div>
      <div className="show-item">
        <div style={{ paddingLeft: 130, width: '100%' }}>
          <TableFields formData={formData} fields={fields} />
        </div>
      </div>
    </Fragment>
  );
}
export default TableShow;
