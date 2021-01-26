import React, { Component, Fragment } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { Form } from 'antd';
import 'react-markdown-editor-lite/lib/index.css';
import './index.less';
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
const plugins = [
  'header', //标题
  'font-bold', //加粗
  'font-italic',
  'font-strikethrough',
  'list-unordered',
  //'list-ordered',
  'block-quote',
  'block-wrap',
  'block-code-inline',
  'block-code-block',
  'table',
  'clear',
  'logger',
  'mode-toggle',
  'full-screen',
];
class SampleData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentDidMount() {
    this.setState({
      value: this.props.formData[this.props.name],
    });
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      value: text,
    });
  };
  render() {
    const { label, name, rules, options, style } = this.props;
    return (
      <Fragment>
        <Form.Item
          name={name}
          rules={rules}
          label={label}
          style={{ width: '100%' }}
          getValueFromEvent={e => e.text}
        >
          <MdEditor
            plugins={plugins}
            value={this.state.value}
            style={{ height: '300px' }}
            renderHTML={text => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </Form.Item>
      </Fragment>
    );
  }
}

export default SampleData;
