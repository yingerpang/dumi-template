import React, { Component } from 'react';
import FormRender from '../../lib/form-render/src/antd';
import PropTypes from 'prop-types';

export default class CommonRender extends Component {
  constructor() {
    super();
    this.state = {
      schemaJson: null,
    };
  }

  componentDidMount() {
    const { schemaJson } = this.props;
    const { properties } = schemaJson;
    const config = {};

    for (let key in properties) {
      config[key] = {
        'ui:hidden': properties[key]['ui:hidden'],
      };
    }
    //遍历所有表单组件的key，并获取到初始属性
    for (let key in schemaJson['properties']) {
      schemaJson['properties'][key]['ui:hidden'] = config[key]['ui:hidden'];
    }
    this.setState({
      config,
      schemaJson,
    });
  }

  handleChange = (obj, value) => {
    if (!value) return;
    const { handleChange } = this.props;
    const config = handleChange(obj, value, this.state.config);
    const { schemaJson } = this.state;
    //遍历所有表单组件的key，并获取到初始属性
    for (let key in schemaJson['properties']) {
      schemaJson['properties'][key]['ui:hidden'] = config[key]['ui:hidden'];
    }
    this.setState({
      config,
      schemaJson,
    });
  };

  render() {
    //获取传递的参数
    const { handValidate, formData, readOnly, ...rest } = this.props;
    const { schemaJson } = this.state;
    if (!schemaJson) {
      return null;
    }
    return (
      <FormRender
        formData={formData}
        schema={schemaJson}
        onChange={this.handleChange}
        onValidate={handValidate}
        readOnly={readOnly}
        {...rest}
      ></FormRender>
    );
  }
}
//schemaJson：json数据
//handleChange：改变事件
//handValidate：校验事件
//formData:表单的值
CommonRender.propTypes = {
  schemaJson: PropTypes.string.isRequired, //设置json数据的类型，且必填
  handleChange: PropTypes.func,
  handValidate: PropTypes.func,
  formData: PropTypes.object.isRequired,
  widgets: PropTypes.node,
  readOnly: PropTypes.bool, //是否只读
};
