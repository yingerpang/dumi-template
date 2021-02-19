---
order: 6
nav:
  order: 6
  title: 组件【Demo】
toc: menu
---

# 展示

[comment]: <> (## 开发)

[comment]: <> (这里是所有自定义组件的展示空间，需要开发自定义组件非常简易：)

[comment]: <> (1. 打开 github 仓库 /widgets/ 文件夹)

[comment]: <> (2. 复制一份 /widgets/template)

[comment]: <> (3. 修改代码、package.json 里的发布名称（注意发布名遵循 @form-render/xxx 的规范）)

[comment]: <> (4. 运行、测试 & 发布)

[comment]: <> (欢迎大家提交常用的自定义组件，让这个库变的更为丰富)

[comment]: <> (## 展示)

# DEMO

### FORM【下拉框联动与自定义 widget】

[comment]: <> (一个展示 hello world 文案的模板自定义组件)

```jsx
import React, { useState, Component, Fragment } from 'react';
import HSFormRender from '../lib/form-render/src/antd';
import { Button, Input, Select } from 'antd';
import MockTable from './mockTable';
import './index.less';
const styles = {
  fontSize: 16,
  marginTop: 20,
};
const { Option } = Select;
const provinceData = [
  { key: 'Zhejiang', value: '浙江' },
  { key: 'Jiangsu', value: '江苏' },
];
const cityData = {
  Zhejiang: [
    { key: 'hangzhou', value: '杭州' },
    { key: 'ningbo', value: '宁波' },
    { key: 'wenzhou', value: '温州' },
  ],
  Jiangsu: [
    { key: 'nanjing', value: '南京' },
    { key: 'suzhou', value: '苏州' },
    { key: 'zhejiang', value: '浙江' },
  ],
};
export default class FormRenderInput extends Component {
  constructor() {
    super();
    this.state = {
      formData: {},
      validateData: {},
      operation: '',
      province: null,
      city: null,
      cities: cityData.Zhejiang,
    };
    this.testRef = React.createRef();
  }

  submit = () => {
    const { operation } = this.state;
    alert(JSON.stringify(operation, null, 2));
  };

  handleChange = (formData, key, schema) => {
    this.setState({
      formData,
      operation: {
        cataCode: formData.cataCode,
        keyword: formData.keyword,
        city: this.state.operation.city,
      },
    });
  };
  handleValidate = (valid, message) => {
    this.setState({
      validateData: valid,
    });
  };

  handleSubmit = () => {
    const { formData } = this.state;
  };
  resetFilter = () => {
    this.setState({
      formData: {},
      operation: {},
      province: null,
      city: null,
    });
  };

  handleProvinceChange = province => {
    this.setState(
      {
        cities: cityData[province],
        province,
        city: null,
      },
      () => {
        const { province, city } = this.state;
        this.setState({
          operation: {
            ...this.state.formData,
            city: { area: city ? province + '-' + city : province },
          },
        });
      },
    );
  };

  onSecondCityChange = city => {
    this.setState({ city }, () => {
      const { province, city } = this.state;
      this.setState({
        operation: {
          ...this.state.formData,
          city: { area: city ? province + '-' + city : province },
        },
      });
    });
  };

  render() {
    const {
      formData,
      operation,
      validateData,
      province,
      city,
      cities,
    } = this.state;
    const SiteInput = ({ value, onChange, name }) => {
      return (
        <div className={'custom-widget-box'}>
          <Select
            value={province}
            style={{ width: 175, marginRight: 10 }}
            onChange={this.handleProvinceChange}
          >
            {provinceData.map(province => (
              <Option key={province.key} value={province.key}>
                {province.value}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 170, marginLeft: 10 }}
            value={city}
            onChange={this.onSecondCityChange}
          >
            {cities.map(city => (
              <Option key={city.key} value={city.key}>
                {city.value}
              </Option>
            ))}
          </Select>
        </div>
      );
    };
    return (
      <>
        <HSFormRender
          ref={this.testRef}
          formData={formData}
          onChange={this.handleChange}
          onValidate={this.handleValidate}
          schema={{
            type: 'object',
            properties: {
              cataCode: {
                title: '资源目录',
                type: 'string',
                enum: ['all', 'platform', 'develop'],
                enumNames: ['全部', '平台接入测试', '开发资源测试'],
              },
              keyword: {
                title: '编码/名称',
                type: 'string',
                'ui:options': {
                  placeholder: '111',
                },
              },
              city: {
                title: '',
                type: 'object',
                name: 'area',
                properties: {
                  area: {
                    title: '区域',
                    type: 'string',
                    'ui:widget': 'siteInput',
                    'ui:width': '100%',
                    'ui:options': {
                      placeholder: '111',
                    },
                  },
                },
              },
            },
            'ui:column': 3,
            'ui:displayType': 'row',
            'ui:showDescIcon': true,
          }}
          widgets={{
            siteInput: SiteInput,
          }}
        />
        <Button onClick={this.submit} type={'primary'}>
          搜索
        </Button>
        <Button onClick={this.resetFilter} style={{ marginLeft: 10 }}>
          重置
        </Button>
        <div style={{ ...styles }}>
          onChange事件：实时获取当前表单数据：
          {JSON.stringify(operation)}
        </div>
        <div style={{ ...styles }}>
          onValidate事件：时时将校验信息的数组存储到 state 中：
          {JSON.stringify(validateData)}
        </div>
      </>
    );
  }
}
```

### FORM【下拉框联动、异步获取数据绑定】

```jsx
import React, { useState, useRef, useEffect, Component } from 'react';
import Generator, { fromFormily, toFormily } from 'fr-generator';
import HSFormRender from '../lib/form-render/src/antd';
import { loadProvince, loadCity, loadArea } from './mock';

export default class SelectAssembly extends Component {
  constructor() {
    super();
    this.state = {
      formData: { province: null, city: null, area: null, detail: null },
      provinceEnums: [],
      provinceEnumNames: [],
      cityEnums: [],
      cityEnumNames: [],
      areaEnums: [],
      areaEnumNames: [],
      loading: true,
    };
  }
  componentDidMount() {
    loadProvince().then(res => {
      const { provinceEnums, provinceEnumNames } = res;
      this.setState({ provinceEnums, provinceEnumNames, loading: false });
    });
  }

  onChange = (obj, formData) => {
    if (!formData) return;
    const { key, val } = obj;
    let result = val.split('_');
    let params = { val: result[0], key };
    if (key == 'province') {
      loadCity(params).then(res => {
        const { cityEnums, cityEnumNames } = res;
        this.setState(
          {
            cityEnums,
            cityEnumNames,
            formData,
          },
          () => {},
        );
      });
    }
    if (key == 'city') {
      loadArea(params).then(res => {
        const { areaEnums, areaEnumNames } = res;
        this.setState(
          {
            areaEnums,
            areaEnumNames,
            formData,
          },
          () => {},
        );
      });
    }
    this.setState({
      formData,
    });
  };

  render() {
    const {
      formData,
      provinceEnums,
      provinceEnumNames,
      loading,
      cityEnums,
      cityEnumNames,
      areaEnums,
      areaEnumNames,
    } = this.state;
    if (loading) {
      return null;
    }
    return (
      <>
        <HSFormRender
          formData={formData}
          onChange={this.onChange}
          schema={{
            type: 'object',
            properties: {
              province: {
                title: '用户常驻地址',
                type: 'string',
                enum: provinceEnums,
                enumNames: provinceEnumNames,
                description: '',
                'ui:width': '25%',
                'ui:labelWidth': 106,
                default: null,
                'ui:readonly': false,
                'ui:options': {
                  placeholder: '请选择省',
                },
              },
              city: {
                title: '',
                type: 'string',
                enum: cityEnums,
                enumNames: cityEnumNames,
                default: null,
                'ui:width': '20%',
                'ui:options': {
                  placeholder: '请选择市',
                },
              },
              area: {
                title: '',
                type: 'string',
                enum: areaEnums,
                enumNames: areaEnumNames,
                default: null,
                'ui:width': '20%',
                'ui:options': {
                  placeholder: '请选择区',
                },
              },
              detail: {
                title: '',
                type: 'string',
                'ui:width': '20%',
                'ui:labelWidth': 103,
                'ui:readonly': false,
                'ui:options': {
                  placeholder: '请填写详细地址',
                },
              },
            },
            'ui:column': 3,
            'ui:displayType': 'row',
            'ui:showDescIcon': true,
          }}
        />
      </>
    );
  }
}
```

### FORM【下拉框联动、onChange 事件中异步获取数据绑定、属性 ui:hidden 控制组件显示隐藏，ui:disabled:控制组件禁用】

```jsx
import React, { useState, useRef, useEffect, Component } from 'react';
import Generator, { fromFormily, toFormily } from 'fr-generator';
import HSFormRender from '../lib/form-render/src/antd';
import { loadProvince, loadCity, loadArea } from './mock';

export default class SelectAssembly extends Component {
  constructor() {
    super();
    this.state = {
      formData: { province: null, city: null, area: null, detail: null },
      provinceEnums: [],
      provinceEnumNames: [],
      cityEnums: [],
      cityEnumNames: [],
      areaEnums: [],
      areaEnumNames: [],
      loading: true,
    };
  }
  componentDidMount() {
    loadProvince().then(res => {
      const { provinceEnums, provinceEnumNames } = res;
      this.setState({ provinceEnums, provinceEnumNames, loading: false });
    });
  }

  onChange = (obj, formData) => {
    if (!formData) return;
    const { key, val } = obj;
    let result = val.split('_');
    let params = { val: result[0], key };
    if (key == 'province') {
      loadCity(params).then(res => {
        const { cityEnums, cityEnumNames } = res;
        this.setState(
          {
            cityEnums,
            cityEnumNames,
            formData: {
              ...formData,
              city: null,
              area: null,
              detail: null,
              result: result[1],
            },
          },
          () => {},
        );
      });
    }
    if (key == 'city') {
      loadArea(params).then(res => {
        const { areaEnums, areaEnumNames } = res;
        this.setState(
          {
            areaEnums,
            areaEnumNames,
            formData: {
              ...formData,
              area: null,
              detail: null,
              result: result[1],
            },
          },
          () => {},
        );
      });
    }
    this.setState({
      formData,
    });
  };

  render() {
    const {
      formData,
      provinceEnums,
      provinceEnumNames,
      loading,
      cityEnums,
      cityEnumNames,
      areaEnums,
      areaEnumNames,
    } = this.state;
    if (loading) {
      return null;
    }
    return (
      <>
        <HSFormRender
          formData={formData}
          onChange={this.onChange}
          schema={{
            type: 'object',
            properties: {
              province: {
                title: '用户常驻地址',
                type: 'string',
                enum: provinceEnums,
                enumNames: provinceEnumNames,
                description: '',
                'ui:width': '25%',
                'ui:labelWidth': 106,
                default: null,
                'ui:readonly': false,
                'ui:options': {
                  placeholder: '请选择省',
                },
              },
              city: {
                title: '',
                type: 'string',
                enum: cityEnums,
                enumNames: cityEnumNames,
                default: null,
                'ui:width': '20%',
                'ui:options': {
                  placeholder: '请选择市',
                },
                'ui:hidden': '{{rootValue.province ==null}}',
              },
              area: {
                title: '',
                type: 'string',
                enum: areaEnums,
                enumNames: areaEnumNames,
                default: null,
                'ui:width': '20%',
                'ui:options': {
                  placeholder: '请选择区',
                },
                'ui:hidden': '{{rootValue.city ==null}}',
              },
              detail: {
                title: '',
                type: 'string',
                'ui:width': '20%',
                'ui:labelWidth': 103,
                'ui:readonly': false,
                'ui:options': {
                  placeholder: '请填写详细地址',
                },
                'ui:hidden': '{{rootValue.area ==null}}',
              },
              result: {
                title: '当前选中项',
                type: 'string',
                'ui:disabled': true,
                'ui:width': '100%',
              },
            },
            'ui:column': 3,
            'ui:displayType': 'row',
            'ui:showDescIcon': true,
          }}
        />
      </>
    );
  }
}
```

### FORM【下拉框联动、ui:hidden 通过变量控制组件显示隐藏，ui:disabled 通过变量控制组件禁用】

```jsx
import React, { useState, useRef, useEffect, Component } from 'react';
import Generator, { fromFormily, toFormily } from 'fr-generator';
import HSFormRender from '../lib/form-render/src/antd';
import { loadProvince, loadCity, loadArea } from './mock';

export default class SelectAssembly extends Component {
  constructor() {
    super();
    this.state = {
      formData: { province: null, city: null, area: null, detail: null },
      provinceEnums: [],
      provinceEnumNames: [],
      cityEnums: [],
      cityEnumNames: [],
      areaEnums: [],
      areaEnumNames: [],
      loading: true,
      areaIsHidden: true, //区组件是否隐藏，默认隐藏
    };
  }
  componentDidMount() {
    loadProvince().then(res => {
      const { provinceEnums, provinceEnumNames } = res;
      this.setState({ provinceEnums, provinceEnumNames, loading: false });
    });
  }

  onChange = (obj, formData) => {
    if (!formData) return;
    const { key, val } = obj;
    let result = val.split('_');
    let params = { val: result[0], key };
    if (key == 'province') {
      loadCity(params).then(res => {
        const { cityEnums, cityEnumNames } = res;
        this.setState(
          {
            cityEnums,
            cityEnumNames,
            formData: {
              ...formData,
              city: null,
              area: null,
              detail: null,
              result: result[1],
            },
            areaIsHidden: true,
          },
          () => {},
        );
      });
    }
    if (key == 'city') {
      loadArea(params).then(res => {
        const { areaEnums, areaEnumNames } = res;
        this.setState(
          {
            areaEnums,
            areaEnumNames,
            formData: {
              ...formData,
              area: null,
              detail: null,
              result: result[1],
            },
            areaIsHidden: false, //选城市后显示状态为false
          },
          () => {},
        );
      });
    }
    this.setState({
      formData,
    });
  };

  render() {
    const {
      formData,
      provinceEnums,
      provinceEnumNames,
      loading,
      cityEnums,
      cityEnumNames,
      areaEnums,
      areaEnumNames,
      areaIsHidden,
    } = this.state;
    if (loading) {
      return null;
    }
    return (
      <>
        <HSFormRender
          formData={formData}
          onChange={this.onChange}
          schema={{
            type: 'object',
            properties: {
              province: {
                title: '用户常驻地址',
                type: 'string',
                enum: provinceEnums,
                enumNames: provinceEnumNames,
                description: '',
                'ui:width': '25%',
                'ui:labelWidth': 106,
                default: null,
                'ui:readonly': false,
                'ui:options': {
                  placeholder: '请选择省',
                },
              },
              city: {
                title: '',
                type: 'string',
                enum: cityEnums,
                enumNames: cityEnumNames,
                default: null,
                'ui:width': '20%',
                'ui:options': {
                  placeholder: '请选择市',
                },
                'ui:hidden': formData.province == null,
              },
              area: {
                title: '',
                type: 'string',
                enum: areaEnums,
                enumNames: areaEnumNames,
                default: null,
                'ui:width': '20%',
                'ui:options': {
                  placeholder: '请选择区',
                },
                'ui:hidden': areaIsHidden, //动态控制隐藏与否
              },
              detail: {
                title: '',
                type: 'string',
                'ui:width': '20%',
                'ui:labelWidth': 103,
                'ui:readonly': false,
                'ui:options': {
                  placeholder: '请填写详细地址',
                },
                'ui:hidden': '{{rootValue.area ==null}}',
              },
              result: {
                title: '当前选中项',
                type: 'string',
                'ui:disabled': true,
                'ui:width': '100%',
              },
            },
            'ui:column': 3,
            'ui:displayType': 'row',
            'ui:showDescIcon': true,
          }}
        />
      </>
    );
  }
}
```

### FORM【封装 1】

```jsx
import React, { Component } from 'react';
import HSCommonRender from './components/commonRender';

export default class FormAssembly extends Component {
  constructor() {
    super();
    this.state = {
      formData: {},
      schemaJson: {},
      isHidden: true,
      config: {
        time: { hidden: true },
        'time-interval': {
          hidden: false,
        },
      },
    };
  }

  handleChange = (obj, formData) => {
    if (!formData) {
      return;
    }
    const { config } = this.state;
    if (obj.key == 'time') {
      config['time'].hidden = !config['time'].hidden;
      this.setState({
        config,
        formData,
      });
    }
    this.setState({ formData });
  };

  render() {
    const { formData, schemaJson, isHidden, config } = this.state;
    console.log('config', config);
    return (
      <div>
        <HSCommonRender
          formData={formData}
          schemaJson={{
            type: 'object',
            properties: {
              time: {
                title: '高峰时段',
                type: 'string',
                enum: ['a', 'b', 'c'],
                enumNames: ['早', '中', '晚'],
                description: '',
                'ui:width': '25%',
                'ui:labelWidth': 106,
                default: null,
                'ui:readonly': false,
                'ui:hidden': false,
                'ui:options': {
                  placeholder: '请选择',
                },
              },
              'time-interval': {
                title: '',
                type: 'string',
                enum: ['7-11', '12-14', '14-20'],
                enumNames: ['7点-12点', '12点-14点', '14点-20点'],
                default: null,
                'ui:width': '20%',
                'ui:readonly': false,
                'ui:hidden': config.time.hidden,
                'ui:options': {
                  placeholder: '请选择时间段',
                },
              },
            },
            'ui:column': 3,
            'ui:displayType': 'row',
            'ui:showDescIcon': true,
          }}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}
```

### FORM【封装 2】

```jsx
import React, { useState } from 'react';
import HSCommonRender from './components/commonRender';
const setting = {
  schemaJson: {
    type: 'object',
    properties: {
      string: {
        title: '字符串',
        description: '请填写您的完整姓名',
        type: 'string',
      },
      select: {
        title: '单选',
        type: 'string',
        enum: ['a', 'b', 'c'],
        enumNames: ['选项1', '选项2', '选项3'],
      },
    },
  },
  displayType: 'row',
  showDescIcon: true,
};
const Demo = () => {
  const [formData, setFormData] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  console.log('formData', formData);
  const onChange = (obj, value) => {
    setFormData(value);
  };

  const handleReadOnly = () => {
    setReadOnly(!readOnly);
  };
  return (
    <div style={{ width: 400 }}>
      <HSCommonRender
        {...setting}
        readOnly={readOnly}
        formData={formData}
        handleChange={onChange}
      />
      <button onClick={handleReadOnly}>
        {readOnly ? '进入编辑' : '进入只读'}
      </button>
    </div>
  );
};
export default Demo;
```

### FORM【封装 3】

```jsx
import React, { Component } from 'react';
import HSCommonRender from './components/commonRenderDemo';

export default class FormAssembly extends Component {
  constructor() {
    super();
    this.state = {
      formData: {},
      schemaJson: {},
      isHidden: true,
      config: null,
    };
  }
  componentDidMount() {
    //初始化schema
    const schemaJson = {
      type: 'object',
      properties: {
        time: {
          title: '高峰时段',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          description: '',
          'ui:width': '25%',
          'ui:labelWidth': 106,
          default: null,
          'ui:readonly': false,
          'ui:hidden': false,
          'ui:options': {
            placeholder: '请选择',
          },
        },
        'time-interval': {
          title: '',
          type: 'string',
          enum: ['7-11', '12-14', '14-20'],
          enumNames: ['7点-12点', '12点-14点', '14点-20点'],
          default: null,
          'ui:width': '20%',
          'ui:readonly': false,
          'ui:hidden': true,
          'ui:options': {
            placeholder: '请选择时间段',
          },
        },
      },
      'ui:column': 3,
      'ui:displayType': 'row',
      'ui:showDescIcon': true,
    };
    const { properties } = schemaJson;
    const config = {};
    //遍历所有表单组件的key，并获取到初始属性
    for (let key in properties) {
      config[key] = {
        'ui:hidden': properties[key]['ui:hidden'],
      };
    }
    this.setState({ config, schemaJson });
  }

  handleChange = (obj, formData) => {
    if (!formData) return;
    const { config } = this.state;
    if (obj.key == 'time') {
      config['time-interval']['ui:hidden'] = !config['time-interval'][
        'ui:hidden'
      ];
      this.setState({
        config,
        formData,
      });
    }
    this.setState({ formData });
  };

  render() {
    const { formData, schemaJson, isHidden, config } = this.state;
    if (!config) {
      return null;
    }
    return (
      <HSCommonRender
        formData={formData}
        config={config}
        schemaJson={schemaJson}
        handleChange={this.handleChange}
      />
    );
  }
}
```

### FORM【封装 4】

```jsx
import React, { Component } from 'react';
import HSCommonRender from './components/commonRenderConfig';

export default class FormAssembly extends Component {
  constructor() {
    super();
    this.state = {
      formData: { a: 'a', b: 'b' },
      schemaJson: {
        type: 'object',
        properties: {
          time: {
            title: '高峰时段',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            description: '',
            'ui:width': '25%',
            'ui:labelWidth': 106,
            default: null,
            'ui:readonly': false,
            'ui:hidden': false,
            'ui:options': {
              placeholder: '请选择',
            },
          },
          'time-interval': {
            title: '',
            type: 'string',
            enum: ['7-11', '12-14', '14-20'],
            enumNames: ['7点-12点', '12点-14点', '14点-20点'],
            default: null,
            'ui:width': '20%',
            'ui:readonly': false,
            'ui:hidden': true,
            'ui:options': {
              placeholder: '请选择时间段',
            },
          },
        },
        'ui:column': 3,
        'ui:displayType': 'row',
        'ui:showDescIcon': true,
      },
    };
  }

  handleChange = (obj, formData, config) => {
    config['time-interval']['ui:hidden'] = !config['time-interval'][
      'ui:hidden'
    ];
    this.setState({ formData });
    return config;
  };

  render() {
    const { formData, schemaJson, isHidden } = this.state;
    if (!schemaJson) {
      return null;
    }
    return (
      <HSCommonRender
        formData={formData}
        schemaJson={schemaJson}
        handleChange={this.handleChange}
      />
    );
  }
}
```

### TABLE AND 搜索数据展示

```jsx
import React, { useRef, useState, Component, Fragment } from 'react';
import { Button, Modal } from 'antd';
import { ProTable, Search, TableContainer, useTable } from 'table-render';
import HSFormRender from '../lib/form-render/src/antd';
import moment from 'moment';
const mockDatas = [
  {
    id: 624748504,
    title: 'mock数据1',
    state: 'closed',
    created_at: '2021-01-12',
  },
  {
    id: 624691229,
    title: 'mock数据2',
    state: 'open',
    created_at: '2021-01-15',
  },
  {
    id: 624691235,
    title: 'mock数据3',
    state: 'closed',
    created_at: '2021-01-12',
  },
  {
    id: 6246912240,
    title: 'mock数据4',
    state: 'open',
    created_at: '2020-12-26',
  },
  {
    id: 624691241,
    title: 'mock数据5',
    state: 'closed',
    created_at: '2020-05-26',
  },
];
const mockDatas2 = [
  {
    id: 624748504,
    title: 'mock数据1',
    state: 'closed',
    created_at: '2021-01-12',
  },
];
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
      enum: ['null', 'closed', 'open'],
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
      <a href="" target="_blank" rel="noopener noreferrer">
        查看
      </a>
    ),
  },
];

export default class FormRenderInputs extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      mockData: mockDatas,
      operation: '',
      province: null,
      city: null,
    };
    this.tableRef = React.createRef();
  }
  toggle = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  setMockData = () => {};
  handleOk = () => {
    // const {formData,mockData}=this.state
    const { refresh, doSearch, tableState } = this.tableRef.current;
    tableState.dataSource = mockDatas2;
    refresh();
    // let obj={
    //   id: 62474850433,
    //   title: formData.title,
    //   state: formData.state,
    //   created_at: moment(new Date()).format("YYYY-MM-DD"),
    // };
    // mockData.push(obj)
    // tableState.dataSource=mockData;
    // this.setState({mockData:mockData},()=>{
    this.toggle();
    //   doSearch({created_at: "", title: "", status: "null"});
    //   refresh({ stay: true })
    // })
  };
  handleChange = formData => {
    this.setState({
      formData,
    });
  };
  handleValidate = () => {
    // const value = genRef.current && genRef.current.getValue();
    // setSchema(value);
    // toggle();
  };
  searchApi = params => {
    const { mockData } = this.state;
    const { created_at, status, title } = params;
    if (created_at == '' && status == 'null' && title.toString().trim() == '') {
      return {
        rows: mockData,
        total: mockData.length,
      };
    } else {
      let result = mockData.filter(item => {
        return (
          item.created_at == created_at ||
          status == item.state ||
          title == item.title
        );
      });
      return {
        rows: result ? result : [],
        total: result ? result.length : 0,
      };
    }
  };
  customized = () => {
    const { refresh } = useTable();
    return <button onClick={refresh}>自定义刷新按钮</button>;
  };
  render() {
    const { formData, show } = this.state;
    return (
      <>
        <TableContainer searchApi={this.searchApi} ref={this.tableRef}>
          <Search schema={searchSchema} />
          <ProTable
            headerTitle="数据记录"
            toolbarRender={() => [
              <Button key="1">查看日志</Button>,
              <Button key="2">导出数据</Button>,
              <Button key="3" onClick={this.toggle}>
                新增
              </Button>,
            ]}
            // 下面全是antd的props
            columns={columns}
            rowKey="id"
          />
        </TableContainer>
        <Modal
          visible={show}
          centered
          title={'新增数据'}
          onCancel={this.toggle}
          onOk={this.handleOk}
          okText="保存"
          cancelText="关闭"
        >
          <HSFormRender
            formData={formData}
            onChange={this.handleChange}
            onValidate={this.handleValidate}
            schema={{
              type: 'object',
              properties: {
                title: {
                  title: '标题',
                  type: 'string',
                  'x-component-props': {},
                  name: 'title',
                  key: 'title',
                },
                state: {
                  title: '状态',
                  type: 'string',
                  enum: ['open', 'closed'],
                  enumNames: ['未解决', '已解决'],
                  'x-component': 'radio',
                  name: 'state',
                  key: 'state',
                },
              },
              'ui:displayType': 'row',
              'ui:showDescIcon': true,
            }}
          />
        </Modal>
      </>
    );
  }
}
```

### 动态获取 Schema

```jsx
import React, { useState, useRef } from 'react';
import Generator, { fromFormily, toFormily } from 'fr-generator';
import { Button, Modal, Input } from 'antd';
const { TextArea } = Input;
const defaultValue = {
  type: 'object',
  properties: {
    array: {
      key: 'array',
      type: 'array',
      name: 'array',
      title: '标题',
      'x-component': 'arraytable',
      items: {
        type: 'object',
        properties: {
          aa: {
            key: 'aa',
            type: 'string',
            name: 'aa',
            title: 'AA',
            enum: [
              {
                label: '显示',
                value: true,
              },
              {
                label: '隐藏',
                value: false,
              },
            ],
            'x-component': 'input',
          },
          bb: {
            key: 'bb',
            type: 'string',
            name: 'bb',
            title: 'BB',
            'x-component': 'select',
          },
        },
      },
    },
    cc: {
      key: 'cc',
      type: 'string',
      name: 'cc',
      title: 'CC',
      'x-component': 'input',
      'x-component-props': { min: 1 },
    },
  },
};
const Demo = () => {
  const [show, setShow] = useState(false);
  const [schema, setSchema] = useState(() => defaultValue);
  const genRef = useRef(); // class组件用 React.createRef()
  const toggle = () => setShow(o => !o);
  const handleOk = () => {
    const value = genRef.current && genRef.current.getValue();
    setSchema(value);
    toggle();
  };
  return (
    <div>
      <Button type="primary" onClick={toggle} style={{ marginBottom: 12 }}>
        配置schema
      </Button>
      <Modal
        visible={show}
        onCancel={toggle}
        onOk={handleOk}
        okText="保存"
        cancelText="关闭"
        width="90%"
        bodyStyle={{ height: '80vh' }}
      >
        <Generator
          ref={genRef}
          defaultValue={schema}
          transformer={{
            from: fromFormily,
            to: toFormily,
          }}
        />
      </Modal>
      <TextArea
        autoSize
        value={JSON.stringify(schema, null, 2)}
        onChange={() => {}}
      />
    </div>
  );
};
// const b = {
//   schema: {
//     type: 'object',
//     properties: {
//       array: {
//         type: 'array',
//         title: 'Name',
//         items: {
//           type: 'object',
//           properties: {
//             aa: {
//               type: 'string',
//               title: '控制相邻字段显示隐藏',
//               enum: [true, false],
//               'ui:widget': 'input',
//               enumNames: ['显示', '隐藏'],
//             },
//             bb: { type: 'string', title: 'BB', 'ui:widget': 'input' },
//           },
//         },
//       },
//       cc: {
//         type: 'string',
//         title: 'CC',
//         'ui:widget': 'input',
//         'ui:options': { min: 1 },
//       },
//     },
//   },
// };
export default Demo;
```

### 自定义表单设计器

```jsx
import React from 'react';
import Generator, {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from 'fr-generator';
import { Input } from 'antd';

const NewWidget = ({ value = 0, onChange }) => (
  <Input onClick={() => onChange(value + 1)} />
);
const customWidget = ({ value = 0, onChange }) => <div>标题</div>;

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Generator
        widgets={{ customWidget, NewWidget }}
        settings={[
          {
            title: '自定义控件',
            widgets: [
              {
                text: '输入框',
                name: 'input',
                widget: 'NewWidget',
                schema: {
                  title: '输入框',
                  type: 'string',
                },
                setting: {
                  'ui:options': {
                    title: '选项',
                    type: 'object',
                    'ui:labelWidth': 80,
                    properties: {
                      allowClear: {
                        title: '是否带清除按钮',
                        description: '填写内容后才会出现x哦',
                        type: 'boolean',
                      },
                      addonBefore: {
                        title: '前tab',
                        type: 'string',
                      },
                      addonAfter: {
                        title: '后tab',
                        type: 'string',
                      },
                      prefix: {
                        title: '前缀',
                        type: 'string',
                      },
                      suffix: {
                        title: '后缀',
                        type: 'string',
                      },
                    },
                  },
                  minLength: {
                    title: '最短字数',
                    type: 'number',
                  },
                  maxLength: {
                    title: '最长字数',
                    type: 'number',
                  },
                  pattern: {
                    title: '校验正则表达式',
                    type: 'string',
                    'ui:options': {
                      placeholder: '填写正则表达式',
                    },
                  },
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
export default Demo;
```
