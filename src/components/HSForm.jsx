import React, { useEffect, useState, useMemo } from 'react';
import Form from 'form-render/lib/antd';
const defaultOption = {
  string: {
    title: 'LA',
    hidden: false,
    readOnly: true,
  },
  number: {
    title: 'CA',
    hidden: false,
    readOnly: true,
  },
};

const HSform = props => {
  const [option, setOption] = useState(defaultOption);
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);
  const formSchema = {
    type: 'object',
    properties: {
      string: {
        title: option.string.title,
        type: 'string',
        maxLength: 12,
        'ui:disabled': true,
        'ui:hidden': option.string.hidden,
      },
      number: {
        title: option.number.title,
        type: 'number',
      },
      select: {
        title: '单选',
        type: 'string',
        enum: ['a', 'b', 'c'],
        enumNames: ['早', '中', '晚'],
        'ui:width': '50%', // uiSchema 合并到 schema 中（推荐写法，书写便捷）
      },
    },
  };

  const change = data => {
    console.log('子组件执行开始:', option);
    const _option = props.onChange(option, '11', data);
    console.log('子组件执行完毕1:', _option);
    setOption(_option);
    console.log('子组件执行完毕2:', option);
    // setSchema(schema);
    console.log('子组件执行完毕3:', formSchema);
    setData(data);
  };

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>{option.string.title}</h1>
      <Form
        schema={formSchema}
        formData={formData}
        onChange={change}
        onValidate={setValid}
        showValidate={showValidate}
        displayType="row" // 详细配置见下
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
};

export default HSform;
