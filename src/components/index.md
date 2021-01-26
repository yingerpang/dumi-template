---
order: 1
title: 基本组件
nav:
  order: 2
  title: 组件
toc: menu
---

## Input

### 基本使用

```jsx
import React from 'react';
import Demo from '../DynamicFormItem/Demo';

const schema = {
  basicUse: {
    title: '基本使用',
    fields: [
      {
        name: 'base',
        label: '输入框',
        widget: 'input',
        options: {
          placeholder: 'Basic usage',
        },
      },
    ],
  },
};

export default () => <Demo schema={schema} />;
```

### 禁止使用状态

`设置disabled: true`

```jsx
import React from 'react';
import Demo from '../DynamicFormItem/Demo';

const schema = {
  basicUse: {
    title: '禁用状态',
    fields: [
      {
        name: 'disabled',
        label: '输入框',
        widget: 'input',
        disabled: true,
        options: {
          placeholder: 'Basic usage',
        },
      },
    ],
  },
};

export default () => <Demo schema={schema} />;
```

### 输入框必填

`设置required: true`

```jsx
import React from 'react';
import Demo from '../DynamicFormItem/Demo';

const schema = {
  basicUse: {
    title: '输入框必填',
    fields: [
      {
        name: 'required',
        label: '输入框',
        widget: 'input',
        required: true,
        options: {
          placeholder: 'Basic usage',
        },
      },
    ],
  },
};

export default () => <Demo schema={schema} />;
```

### 带有帮助信息的输入框

`设置help说明`

```jsx
import React from 'react';
import Demo from '../DynamicFormItem/Demo';

const schema = {
  basicUse: {
    title: '帮助信息输入框',
    fields: [
      {
        name: 'help',
        label: '输入框',
        widget: 'input',
        required: true,
        help: '帮助信息输入框',
        options: {
          placeholder: 'Basic usage',
        },
      },
    ],
  },
};

export default () => <Demo schema={schema} />;
```

### 带验证规则输入框

`设置rules中校验规则，pattern正则表达式；message校验说明`

```jsx
import React from 'react';
import Demo from '../DynamicFormItem/Demo';

const schema = {
  basicUse: {
    title: '验证规则输入框',
    fields: [
      {
        name: 'rules',
        label: '输入框',
        widget: 'input',
        rules: [
          {
            pattern: /^[0-9]+$/,
            message: '序号为数值类型',
          },
        ],
        options: {
          placeholder: 'Basic usage',
        },
      },
    ],
  },
};

export default () => <Demo schema={schema} />;
```

### 带自定义样式的输入框

`设置style中样式`

```jsx
import React from 'react';
import Demo from '../DynamicFormItem/Demo';

const schema = {
  basicUse: {
    title: '自定义样式输入框',
    fields: [
      {
        name: 'style',
        label: '输入框',
        widget: 'input',
        style: {
          width: '100%',
        },
        options: {
          placeholder: 'Basic usage',
        },
      },
    ],
  },
};

export default () => <Demo schema={schema} />;
```

### 展示状态的输入框(默认文本展示)

```jsx
import React from 'react';
import Demo from '../DynamicFormItem/Demo';

const schema = {
  basicUse: {
    title: '自定义样式输入框',
    fields: [
      {
        name: 'showStatus',
        label: '输入框',
        widget: 'input',
        required: true,
        defaultValue: '展示状态下的文本',
        options: {
          placeholder: 'Basic usage',
        },
      },
    ],
  },
};

export default () => <Demo schema={schema} status="show" />;
```

## API

| 参数         | 说明               | 类型    | 默认值      | 是否必填 |
| ------------ | ------------------ | ------- | ----------- | -------- |
| name         | 表单项字段名       | string  | -           | true     |
| label        | 表单项 label 标题  | string  | -           | true     |
| defaultValue | 默认值             | string  | -           | false    |
| widget       | 展示的组件类型     | string  | -           | true     |
| required     | 是否必填           | boolean | false       | false    |
| disabled     | 表单项组件是否可用 | boolean | -           | false    |
| help         | 帮助信息           | string  | -           | false    |
| rule         | 表单项验证规则     | array   | -           | false    |
| style        | 表单项 ui 样式     | object  | width:"50%" | false    |
| onChange     | 输入框内容变化时的回调| function(e) | -  |false    |
| onValidate     | 时时将校验信息的数组存储到 state 中| function(e) | -  |false    |
| options      | 组件额外配置       | object  | -           | false    |

## Input.options

| 参数            | 说明                                                                                       | 类型    | 默认值 | 是否必填 |
| --------------- | ------------------------------------------------------------------------------------------ | ------- | ------ | -------- |
| formElementOpts | 设置具体表单元素的配置属性，例如 formElement: {placeholder: '',disabled: true,autoSize:{}} | object  | -      | false    |
| placeholder     | 表单项输入说明                                                                             | string  | -      | false    |
| disabledInEdit  | 在编辑时组件是否可用                                                                       | boolean | -      | false    |
| uiWidget        | 自定义展示时需要渲染的 ui 组件                                                             | string  | -      | false    |
| showLabel       | 在编辑时是否展示 label 说明                                                                | boolean | -      | false    |

