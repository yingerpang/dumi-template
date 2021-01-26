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

### Input

[comment]: <> (一个展示 hello world 文案的模板自定义组件)

```jsx
import React, { useState,Component,Fragment } from 'react';
import HSFormRender from '../lib/form-render/src/antd';
import {Button} from 'antd'
import 
import './index.less'
const styles={
  fontSize:16,
  marginTop:20
}
export default class FormRenderInput extends Component{

  constructor() {
    super();
    this.state={
      formData:{},
      validateData:{},
      operation:""
    }
  }
  

  submit = () => {
    const {formData}=this.state;
    alert(JSON.stringify(formData, null, 2));
  };
 
  handleChange=(formData)=>{
    this.setState({
      formData,
      operation:formData
    })
  }
  handleValidate=(valid,message)=>{
    this.setState({
      validateData:valid
    })
  }

  handleSubmit=()=>{
    const {formData}=this.state;
    console.log("formData",formData);
  }
  render(){
    const {formData,operation,validateData}=this.state;
    return (
      <>
        <HSFormRender
          formData={formData}
          onChange={this.handleChange}
          onValidate={this.handleValidate}
          schema={{
            "type": "object",
            "properties": {
              "cataCode": {
                "title": "资源目录",
                "type": "string",
                "enum": [
                  "all",
                  "platform",
                  "develop"
                ],
                "enumNames": [
                  "全部",
                  "平台接入测试",
                  "开发资源测试"
                ]
              },
              "keyword": {
                "title": "编码/名称",
                "type": "string",
                "ui:options": {}
              }
            },
            "ui:column": 2,
            "ui:displayType": "row",
            "ui:showDescIcon": true
          }}
          extralButtons={
            <div className={'extral-buttons-box'}>
              <Button type={'primary'} htmlType={'submit'} onClick={this.handleSubmit}>搜索</Button>
              <Button>重置</Button>
            </div>
          }
        />
        <Table>
        </Table>
        {/*<Button onClick={this.submit} type={'primary'}>提交</Button>*/}
        {/*<div style={{...styles}}>*/}
        {/*  onChange事件：实时获取当前表单数据：*/}
        {/*  {JSON.stringify(operation)}*/}
        {/*</div>*/}
        {/*<div style={{...styles}}>*/}
        {/*  onValidate事件：时时将校验信息的数组存储到 state 中：*/}
        {/*  {JSON.stringify(validateData)}*/}
        {/*</div>*/}
      </>
    );
  }
  
};
```
### Input-由表单设计器获取的数据

[comment]: <> (一个展示 hello world 文案的模板自定义组件)

```jsx
import React, { useState,Component } from 'react';
import HSFormRender from 'form-render/lib/antd';
import {Button} from 'antd'
const styles={
  fontSize:16,
  marginTop:20
}
export default class FormRenderJSON extends Component{
  
  constructor() {
    super();
    this.state={
      formData:{},
      validateData:{},
      operation:""
    }
  }
  

  submit = () => {
    const {formData}=this.state;
    alert(JSON.stringify(formData, null, 2));
  };
 
  handleChange=(formData)=>{
    this.setState({
      formData,
      operation:formData
    })
  }
  handleValidate=(valid,message)=>{
    this.setState({
      validateData:valid
    })
  }
  
  render(){
    const {formData,operation,validateData}=this.state;
    return (
      <div>
        <HSFormRender
          formData={formData}
          onChange={this.handleChange}
          onValidate={this.handleValidate}
          schema={{
            type: "object",
            properties: {
              input_u0vPFe: {
                "title": "输入框",
                "type": "string",
                "ui:options": {},
                "minLength": 5,
                "maxLength": 10,
                "pattern": "\\d"
              },
              textarea_TzF7ma: {
                title: "编辑框",
                type: "string",
                format: "textarea"
              }
            },
            "ui:displayType": "row",
            "ui:showDescIcon": true
          }}
        />
        <Button onClick={this.submit} type={'primary'}>提交</Button>
      </div>
    );
  }
  
};

```

<!-- ### @form-render/async-options

下拉搜索框，搜索的选项从服务端获取 -->

[comment]: <> (### hs-form-render/rich-text)

[comment]: <> (富文本编辑器)

[comment]: <> (```jsx)

[comment]: <> (// import React, { useState } from 'react';)

[comment]: <> (// import HSFormRender from 'form-render/lib/antd';)

[comment]: <> (// import RichTextEditor from '@form-render/rich-text';)

[comment]: <> (//)

[comment]: <> (// const schema = {)

[comment]: <> (//   type: 'object',)

[comment]: <> (//   properties: {)

[comment]: <> (//     content: {)

[comment]: <> (//       title: '富文本编辑器',)

[comment]: <> (//       type: 'string',)

[comment]: <> (//       'ui:widget': 'RichTextEditor',)

[comment]: <> (//     },)

[comment]: <> (//   },)

[comment]: <> (// };)

[comment]: <> (//)

[comment]: <> (// export default function Demo&#40;&#41; {)

[comment]: <> (//   const [formData, setData] = useState&#40;{}&#41;;)

[comment]: <> (//   const [valid, setValid] = useState&#40;[]&#41;;)

[comment]: <> (//)

[comment]: <> (//   const onSubmit = &#40;&#41; => {)

[comment]: <> (//     if &#40;valid.length > 0&#41; {)

[comment]: <> (//       alert&#40;`校验未通过字段：${valid.toString&#40;&#41;}`&#41;;)

[comment]: <> (//     } else {)

[comment]: <> (//       alert&#40;JSON.stringify&#40;formData, null, 2&#41;&#41;;)

[comment]: <> (//     })

[comment]: <> (//   };)

[comment]: <> (//)

[comment]: <> (//   return &#40;)

[comment]: <> (//     <div>)

[comment]: <> (//       <HSFormRender)

[comment]: <> (//         schema={schema})

[comment]: <> (//         formData={formData})

[comment]: <> (//         onChange={setData})

[comment]: <> (//         onValidate={setValid})

[comment]: <> (//         widgets={{)

[comment]: <> (//           RichTextEditor: RichTextEditor,)

[comment]: <> (//         }})

[comment]: <> (//       />)

[comment]: <> (//       <button onClick={onSubmit}>提交</button>)

[comment]: <> (//     </div>)

[comment]: <> (//   &#41;;)

[comment]: <> (// })

[comment]: <> (```)

[comment]: <> (自定义组件的开发规范详见 [自定义组件]&#40;/guide/advanced/widget&#41;)
