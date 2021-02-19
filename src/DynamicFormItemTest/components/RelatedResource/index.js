import React, {
  Component,
  useState,
  useEffect,
  Fragment,
  useCallback,
} from 'react';
import { Form, Input } from 'antd';
import uuid from 'uuid';
import ResourceModal from './ResourceModal';

export default function Resource(props) {
  const form = props.form ? props.form : null;
  const formData = props.formData ? props.formData : {}; //编辑时的默认值
  const currentNodeCode = props.currentNodeCode;
  const [visible, setVisible] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState(
    formData.resourceCode ? formData.resourceCode : [],
  );
  const [expandedKeys, setExpandedKeys] = useState(
    formData.resourceExpandedKeys ? formData.resourceExpandedKeys : [],
  );
  const [currentCateCode, setCurrentCateCode] = useState(
    formData.currentCateCode ? formData.currentCateCode : '',
  );

  const { defaultValue, options, label, name, rules, fields } = props;

  const handleSelect = useCallback((key, checkedInfo, name) => {
    const expandedKeys = checkedInfo.halfCheckedKeys;
    //const expandedKeys = checkedInfo && checkedInfo.checkedNodes ? checkedInfo.checkedNodes.map(item => utils.getPathCode(item)) : []
    //input框的展示的资源名称
    const resourceName =
      checkedInfo && checkedInfo.checkedNodes
        ? checkedInfo.checkedNodes.map(item => item.nodeName)
        : [];
    form.setFieldsValue({
      related: {
        resource:
          resourceName && resourceName.length ? resourceName.join(',') : '',
      },
      // [name + `name`]: resourceName && resourceName.length ? resourceName.join(',') : ""
    });

    //当前选中的资源树code
    const _currentCateCode =
      checkedInfo && checkedInfo.checkedNodes
        ? checkedInfo.checkedNodes[0].cataCode
        : mockData.currentCateCode;
    setCheckedKeys(key);
    setExpandedKeys(
      expandedKeys.length ? [...new Set(expandedKeys.flat())] : expandedKeys,
    );
    console.log(
      expandedKeys.length ? [...new Set(expandedKeys.flat())] : expandedKeys,
    );
    setCurrentCateCode(_currentCateCode);
    setVisible(false);
    const value = {
      resourceExpandedKeys: expandedKeys.length
        ? [...new Set(expandedKeys.flat())]
        : expandedKeys,
      resourceCode: key, //实际选中key就是用户输入字段名的值
      currentCateCode: _currentCateCode,
    };
    form.setFieldsValue({
      resource: key.join(','),
    });
    props.getValue(value);
  }, []);

  const handleCataChange = key => {
    //更新下拉所选资源
    setCurrentCateCode(key);
    //currentNodeCode是从url取的节点code，如果是新增，则是 add
    //编辑状态，key等于存储的currentCateCode时，展示存储的展开key否则展示[]
    //新增状态，key为[]
    if (currentNodeCode !== 'add') {
      const _expandedKeys = key === currentCateCode ? expandedKeys : [];
      setExpandedKeys(_expandedKeys);
    } else {
      setExpandedKeys([]);
    }
  };

  return (
    <Fragment>
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        onClick={() => setVisible(true)}
        {...fields}
        onClick={() => setVisible(true)}
      >
        <Input.TextArea {...options} />
      </Form.Item>
      {visible && (
        <ResourceModal
          visible={visible}
          handleCancel={() => setVisible(false)}
          currentCateCode={currentCateCode}
          getSelectResource={(key, checkedInfo, name) =>
            handleSelect(key, checkedInfo, name)
          }
          cataChange={key => handleCataChange(key)}
          checkedKeys={checkedKeys}
          expandedKeys={expandedKeys}
          {...props}
        />
      )}
    </Fragment>
  );
}
