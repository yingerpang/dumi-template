import React, { Component } from 'react';
import FormRender from '../../lib/form-render/src/antd';
import PropTypes from 'prop-types';

export default class CommonRender extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    //获取传递的参数
    const {
      schemaJson,
      handleChange,
      handValidate,
      formData,
      readOnly,
      ...rest
    } = this.props;

    return (
      <FormRender
        formData={formData}
        schema={schemaJson}
        onChange={handleChange}
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
