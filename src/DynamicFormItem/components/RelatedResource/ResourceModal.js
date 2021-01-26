import React, { Component, Fragment, useState, useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import MultiSelectTree from './MultiSelectTree';
//import utils from 'Utils/tools'
import _isEqual from 'lodash/isEqual';
import uuid from 'uuid';
export default function ResourceModal(props) {
  console.log(props);
  const [btnBlock, setBtnBlock] = useState(true);
  const [checkedKeys, setCheckedKeys] = useState(props.checkedKeys);
  const [expandedKeys, setExpandedKeys] = useState(props.expandedKeys);
  const [checkedInfo, setCheckedInfo] = useState({});
  const { visible, handleCancel, viewCode, currentCateCode, name } = props;

  const handleOk = () => {
    props.getSelectResource(checkedKeys, checkedInfo, name);
  };

  const handleSelectResource = (key, checkedInfo) => {
    const expandedKeys = checkedInfo.halfCheckedKeys;
    // const expandedKeys = checkedInfo.checkedNodes.length && checkedInfo.checkedNodes.map(item => utils.getPathCode(item))
    setExpandedKeys(
      expandedKeys.length ? [...new Set(expandedKeys.flat())] : expandedKeys,
    );
    setCheckedInfo(checkedInfo);
    setCheckedKeys(key);
    setBtnBlock(false);
  };
  return (
    <Modal
      visible={visible}
      title="请选择关联资源"
      onCancel={handleCancel}
      onOk={handleOk}
      className="c-modal"
      width={680}
      footer={[
        <Button
          key={uuid()}
          type="primary"
          disabled={btnBlock}
          onClick={handleOk}
        >
          保存
        </Button>,
        <Button key={uuid()} onClick={handleCancel}>
          取消
        </Button>,
      ]}
      maskClosable={false}
    >
      <MultiSelectTree
        checkedKeys={checkedKeys}
        expandedKeys={expandedKeys}
        getSelected={handleSelectResource}
        currentCateCode={currentCateCode}
        viewCode={viewCode}
        {...props}
      />
    </Modal>
  );
}
