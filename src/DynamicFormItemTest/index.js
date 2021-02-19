import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Select, Radio, Tooltip } from 'antd';
import { v4 as uuid } from 'uuid';
import components from './components';
import './index.less';
import 'antd/dist/antd.css';

import { QuestionCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function CustomerFormItem(props) {
  const [settings, setSettings] = useState(props.settings || {});
  const { formData, form, getValue, status, ...rest } = props;

  //初始化settings处理需要远程获取数据的下拉框列表
  const getPromiseArr = useCallback(() => {
    let targetObj;
    if (isObject(settings)) {
      targetObj = Object.values(settings);
    } else {
      targetObj = settings;
    }

    const promise = {};

    targetObj.forEach(item => {
      item.fields.forEach(subItem => {
        const remote = (subItem.options && subItem.options.remote) || {};
        if (subItem.widget === 'select' && remote.url) {
          let params = remote.params || {};
          // 通过 key：value 的形式把对应的 promise 对象存储起来
          promise[subItem.name] = getSelectList({
            url: remote.url || '',
            params: params,
          });
        }
      });
    });

    return { promise, targetObj };
  }, []);

  useEffect(() => {
    // 如果是查询详情页则不需要前端去异步获取所有 select 的数据，由后端翻译好后返回
    if (status === 'show') {
      return;
    }
    const { values, keys, entries } = Object;
    const { promise, targetObj } = getPromiseArr();

    const promosieArr = values(promise); // 得到具体的 promise 数组
    const promiseKeys = keys(promise); // 对应的 name
    const temp = {}; // 暂存数据的 {database: [{},{},{}]}, 方便后续好通过 key 去取出对应的数据

    // 一次性处理所有的 promise
    Promise.all(promosieArr).then(rs => {
      rs.forEach((_rs, _idx) => {
        let obj = {};
        _rs.forEach(__rs => {
          obj[__rs.rowcode] = __rs.rowname;
        });
        temp[promiseKeys[_idx]] = obj;
      });

      // 在配置里面通过 key 匹配取出对应的数据，然后新增 data 属性，
      // TODO 嵌套对象
      targetObj.forEach(item => {
        item.fields.forEach(sub => {
          for (const [k, v] of entries(promise)) {
            if (k === sub.name) {
              sub.options.data = temp[k];
            }
          }
        });
      });

      // 拿到所有的数据一次性更新配置
      setSettings(targetObj);
    });
  }, []);

  //动态select下拉框值获取
  function getSelectList() {
    return new Promise(function(resolve) {
      const data = [
        { rowcode: '3', rowname: '三方机构', remark: null },
        { rowcode: '2', rowname: '区县', remark: null },
        { rowcode: '1', rowname: '市级', remark: null },
        { rowcode: '0', rowname: '国家', remark: null },
      ];
      resolve(data);
    });
  }

  const getSource = obj => {
    const value =
      formData[obj.name] !== null && formData[obj.name] !== undefined
        ? formData[obj.name].toString()
        : '';
    //展示状态，把数据平铺开
    if (obj.widget === 'select' || obj.widget === 'radio') {
      let source;
      if (status !== 'show') {
        console.log(value);
        return value;
      } else {
        source = value && obj.options.data ? obj.options.data[value] : '';
      }
      return source;
    } else {
      return value;
    }
  };

  const isObject = data => {
    return Object.prototype.toString.call(data) === '[object Object]';
  };

  const renderFormItem = item => {
    const { disabled } = item;
    const options = item.options || {};
    let { disabledInEdit, formElementOpts, placeholder } = options;
    const optStr = item.widget === 'select' ? '选择' : '输入';
    placeholder = placeholder || `请${optStr}${item.label}`;

    switch (item.widget) {
      case 'input':
        return (
          <Input
            disabled={(status === 'edit' && disabledInEdit) || disabled}
            placeholder={placeholder}
            {...formElementOpts}
          />
        );
      case 'textarea':
        return (
          <Input.TextArea
            disabled={(status === 'edit' && disabledInEdit) || disabled}
            placeholder={placeholder}
            {...formElementOpts}
          />
        );
      case 'radio':
        return (
          <Radio.Group
            disabled={(status === 'edit' && disabledInEdit) || disabled}
            placeholder={placeholder}
            {...formElementOpts}
          >
            {Object.entries(item.options.data).map(([key, value]) => {
              const _k =
                typeof item.defaultValue === 'number' ? Number(key) : key;
              return (
                <Radio key={_k} value={_k}>
                  {value}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      case 'select':
        return (
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            disabled={(status === 'edit' && disabledInEdit) || disabled}
            placeholder={placeholder}
            {...formElementOpts}
          >
            {item.options.data
              ? Object.entries(item.options.data).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                ))
              : null}
          </Select>
        );
    }
  };

  // 根据是否有提示信息渲染不同的 label
  const renderLabel = obj => {
    return obj.help ? (
      <span>
        {obj.label}&nbsp;
        <Tooltip title={obj.help}>
          <QuestionCircleOutlined />
        </Tooltip>
      </span>
    ) : (
      obj.label
    );
  };

  // 配置信息的 pattern 字符串转化为真实的正则表达式
  const getVlidateRules = rules => {
    return rules.map(rule => {
      if (typeof rule.pattern === 'string') {
        const pattern = new RegExp(rule.pattern);
        console.log('pattern', pattern);
        rule.pattern = pattern;
      }
      return rule;
    });
  };

  const renderFields = () => {
    let targetObj;
    if (isObject(settings)) {
      targetObj = Object.values(settings);
    } else {
      targetObj = settings;
    }
    return targetObj.map(item => {
      const customerList = Object.keys(components);
      return (
        <div key={uuid()}>
          {item.title}
          <div
            className={status !== 'show' ? 'dynamic-item' : 'show-container'}
          >
            {item.fields.map(obj => {
              const tempRules = obj.rules
                ? [{ required: obj.required }, ...obj.rules]
                : [{ required: obj.required }];
              const rules = getVlidateRules(tempRules);
              if (customerList.includes(obj.widget)) {
                const SpecificStory = components[obj.widget];
                const CustomerShow = components[obj.options.uiWidget];
                return status !== 'show' ? (
                  <SpecificStory
                    key={uuid()}
                    label={
                      obj.options && obj.options.showLabel === false
                        ? ''
                        : renderLabel(obj)
                    }
                    formData={formData}
                    form={form}
                    getValue={getValue}
                    rules={rules}
                    colon={obj.options && obj.options.showLabel !== false}
                    {...obj}
                    {...rest}
                  />
                ) : obj.options.uiWidget ? (
                  <CustomerShow
                    key={uuid()}
                    label={
                      obj.options && obj.options.showLabel === false
                        ? ''
                        : renderLabel(obj)
                    }
                    formData={formData}
                    {...obj}
                  />
                ) : (
                  <div
                    className={`show-item ${
                      obj.hidden ? 'show-item-hidden' : null
                    }`}
                    key={obj.name}
                  >
                    <p
                      className={`show-item-label ${
                        obj.required ? 'required' : ''
                      }`}
                    >
                      {obj.label || ''}:
                    </p>
                    <p className="markdown-body">{getSource(obj)}</p>
                  </div>
                );
              } else {
                return status !== 'show' ? (
                  <Form.Item
                    key={uuid()}
                    name={obj.name}
                    label={
                      obj.options && obj.options.showLabel === false
                        ? ''
                        : renderLabel(obj)
                    }
                    rules={rules}
                    style={obj.style}
                    hidden={obj.hidden}
                    colon={obj.options && obj.options.showLabel !== false}
                    {...obj.fields}
                  >
                    {renderFormItem(obj)}
                  </Form.Item>
                ) : (
                  <div
                    className={`show-item ${
                      obj.hidden ? 'show-item-hidden' : null
                    }`}
                    key={obj.name}
                  >
                    <p
                      className={`show-item-label ${
                        obj.required ? 'required' : ''
                      }`}
                    >
                      {obj.label || ''}:
                    </p>
                    {getSource(obj)}
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    });
  };

  return renderFields();
}
