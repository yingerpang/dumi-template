import React, { useState } from 'react';
import HSForm from '../components/HSForm';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
      maxLength: 12,
      'ui:disabled': true,
    },
    number: {
      title: '数字',
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

const FormRender = () => {
  const [config, setConfig] = useState('');

  const onChange = (option, key, obj) => {
    // console.log('父组件执行开始:', obj);
    // if (obj.number == 1) {
    //     option.string.title = "Hello jack！";
    // }
    // else if (obj.number == 2) {
    //     option.string.title = "Hello tom！";
    //     option.string.hidden = true;
    // }
    // else if (obj.number == 3) {
    //     option.string.title = "Hello frank！";
    // }
    // else {
    //     option.string.title = "Hello Lisa！";
    //     option.string.hidden = false;
    // }
    //
    // if (obj.select == 'c') {
    //     option.string.hidden = true;
    // }
    eval(config);
    console.log(config, config ? JSON.parse(config) : null);
    return option;
  };

  const changeConfig = (newValue, param1, param2) => {
    console.log(1, newValue, 2, param1, 3, param2);
    setConfig(newValue);
  };

  const code = 'const a = 0;';
  return (
    <PageContainer>
      <Row>
        <Col span={12}>
          <HSForm schema={schema} onChange={onChange}></HSForm>
        </Col>
        <Col span={12}>
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={changeConfig}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default FormRender;
