/**
 * @author      mlf
 * @date        2020-09-02
 * @description
 */

import React, { Component, createContext } from 'react';
import { Form, notification, Button } from 'antd';
import CustomerFormItem from './index';
import _isEmpty from 'lodash/isEmpty';
import schema from './schema';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.getDefaultValue(),
      form: null,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      // formData: this.formRef.current.getFieldsValue(),
      // formData: this.getDefaultValue(nodeDetail, settings),
      form: this.formRef.current,
    });
  }

  handleGetValue = (value, field) => {
    let _value = {
      ...this.state.formData,
      ...this.formRef.current.getFieldsValue(),
      ...value,
    };
    this.setState({
      formData: _value,
    });
  };

  handleSubmit = values => {
    const _values = {
      ...this.state.formData,
      ...values,
    };
    console.log('postData', _values);
  };

  // 获取进入表单的表单项初始值，新增从 settings 获取初始值，编辑从详情里获取
  getDefaultValue = detail => {
    let result = {};
    const settings = this.props.schema;
    Object.values(settings).forEach(value => {
      value.fields.forEach(item => {
        if (!detail || _isEmpty(detail)) {
          result[item.name] = item.defaultValue;
        } else {
          Object.entries(detail).forEach(([k, v]) => {
            if (k === item.name) {
              result[item.name] = v || item.defaultValue;
            }
          });
        }
      });
    });
    return result;
  };

  resetForm = () => {
    this.state.form.resetFields();
  };

  render() {
    return (
      <Form
        initialValues={this.state.formData}
        ref={this.formRef}
        onFinish={this.handleSubmit}
      >
        <CustomerFormItem
          settings={this.props.schema}
          form={this.state.form}
          formData={this.state.formData}
          getValue={this.handleGetValue}
          {...this.props}
        />
        <Form.Item label=" " colon={false}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          <Button onClick={this.resetForm} style={{ marginLeft: 10 }}>
            取消
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
