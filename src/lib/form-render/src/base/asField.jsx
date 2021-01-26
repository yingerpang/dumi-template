import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getValidateText } from './validate';
import { usePrevious } from '../hooks';
import { isHidden, isDependShow } from './isHidden';
import {
  isLooselyNumber,
  isCssLength,
  convertValue,
  isDeepEqual,
  getEnum,
} from './utils';
import FoldIcon from '../components/foldIcon';

// asField拆分成逻辑组件和展示组件，从而可替换展示组件的方式完全插拔fr的样式
export const asField = ({ FieldUI, Widget }) => {
  let FieldContainer = ({
    className,
    column,
    showValidate,
    isRoot,
    hidden,
    props,
    showDescIcon,
    width,
    labelWidth,
    disabled,
    readOnly,
    options,
    schema,
    isEditing,
    ...rest
  }) => {
    const firstRender = useRef(true);
    const fieldTouched = useRef(false);
    const {
      displayType,
      rootValue = {},
      formData = {},
      dependShow,
      value: _value,
    } = rest;
    const prevValue = usePrevious(_value);
    // most key of schema, disabled, readOnly, options, hidden, support for function expression
    useEffect(() => {
      if (showValidate) return;
      // 首次渲染不做, TODO: 万一首次渲染是用户输入触发的呢？
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      // 已经动过了就不用验证是否动过
      if (fieldTouched.current === true) return;
      // 之后每次改动就算touch了，尽量避免多余的去使用isDeepEqual，大的复杂表单性能会不好
      if (isDeepEqual(prevValue, _value)) return;
      fieldTouched.current = true;
    }, [_value]);

    const [_hidden, setHidden] = useState(hidden);
    const [_disabled, setDisabled] = useState(disabled);
    const [_readOnly, setReadOnly] = useState(readOnly);
    const [_className, setClassName] = useState(className);
    const [_schema, setSchema] = useState({ ...schema });
    const [_options, setOptions] = useState({ ...options });

    const convertValues = () => {
      let newHidden = convertValue(hidden, formData, rootValue);
      if (newHidden !== undefined && typeof newHidden !== 'boolean') {
        newHidden = isHidden({ hidden: newHidden, rootValue, formData });
      }
      const newClassName = convertValue(className, formData, rootValue);
      const newDisabled = convertValue(disabled, formData, rootValue);
      const newReadOnly = convertValue(readOnly, formData, rootValue);
      let newOptions = { ...options };
      try {
        Object.entries(options).forEach(([key, _val]) => {
          newOptions[key] = convertValue(_val, formData, rootValue);
        });
      } catch (e) {}
      // iterate over schema, and convert every key
      let newSchema = { ...schema };
      Object.keys(schema).forEach(key => {
        const availableKey = [
          'title',
          'description',
          'format',
          'minimum',
          'maximum',
          'minLength',
          'maxLength',
          'pattern',
          'message',
          'min',
          'max',
          'step',
          'enum',
          'enumNames',
        ];
        // TODO: need to cover more
        if (availableKey.indexOf(key) > -1) {
          newSchema[key] = convertValue(schema[key], formData, rootValue);
        }
      });
      setClassName(newClassName);
      setHidden(newHidden);
      setDisabled(newDisabled);
      setReadOnly(newReadOnly);
      setOptions(newOptions);
      setSchema(newSchema);
    };

    // 只有在非editing状态下才会去计算，这个是卡顿最大的源头
    useEffect(() => {
      if (!isEditing) {
        convertValues();
      }
    }, [isEditing]);

    // "ui:hidden": true, hide formItem
    // after "convertValue" being stable, this api will be discarded
    if (_hidden) {
      return null;
    }

    // 历史方法，不建议使用ui:dependShow, 一律使用ui:hidden
    if (isDependShow({ formData, dependShow })) {
      return null;
    }

    // 传入组件的值
    const _rest = {
      ...rest,
      schema: _schema,
      disabled: _disabled,
      readOnly: _readOnly,
      options: _options,
      formData: formData || {},
      rootValue: rootValue || {},
    };

    let isComplex =
      _schema.type === 'object' ||
      (_schema.type === 'array' && getEnum(_schema) === undefined);
    const isModal = options && (options.modal || options.drawer);
    if (isModal) {
      isComplex = false;
    }

    const validateText =
      showValidate || fieldTouched.current ? getValidateText(_rest) : '';
    // 必填*，label，描述，竖排时的校验语，只要存在一个，label就不为空
    const showLabel =
      _schema.title ||
      rest.description ||
      rest.required ||
      (displayType !== 'row' && validateText);

    let columnStyle = {};
    if (!isComplex && width) {
      columnStyle = {
        width,
        paddingRight: '12px',
      };
    } else if (!isComplex && column > 1) {
      columnStyle = {
        width: `calc(100% /${column})`,
        paddingRight: '12px',
      };
    }

    const fieldProps = {
      className: _className,
      columnStyle,
      displayType,
      isComplex,
      isRequired: rest.required,
      isRoot,
      schema: _schema,
      showDescIcon,
      showLabel,
      showValidate,
      validateText,
      labelWidth,
    };

    return (
      <FieldUI {...fieldProps}>
        <Widget {..._rest} invalid={validateText} />
      </FieldUI>
    );
  };
  FieldContainer.propTypes = {
    showValidate: PropTypes.bool,
    column: PropTypes.number,
    isRoot: PropTypes.bool,
    props: PropTypes.object,
    showDescIcon: PropTypes.bool,
    displayType: PropTypes.string,
  };

  FieldContainer.defaultProps = {
    showValidate: true,
    column: 1,
    isRoot: false,
    props: {},
    showDescIcon: false,
    displayType: 'column',
  };

  return FieldContainer;
};

export const DefaultFieldUI = ({
  children,
  className,
  columnStyle, // 处理组件宽度，外部一般不需修改
  displayType, // 展示方式：row 横 column 竖
  isComplex, // 是否是复杂结构：对象和对象数组
  isRequired, // 是否是必填项
  isRoot,
  schema,
  showDescIcon,
  showLabel, // 是否展示label
  showValidate, // 是否展示校验
  validateText, // 校验文字
  labelWidth, // label的长度
}) => {
  // field 整体 label 标签 content 内容
  const {
    title,
    type,
    enum: _enum,
    description = '',
    'ui:widget': widget,
    'ui:options': options,
  } = schema;

  const [collapsed, setCollapsed] = useState(options && options.collapsed);
  // 一个object是否可以折叠，options里collapsed这个值，且这个值只能是true或者false，代表初始是展开还是收起
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const objectCanCollapse =
    type === 'object' &&
    options &&
    [false, true].indexOf(options.collapsed) > -1;
  const isCheckbox = type === 'boolean' && widget !== 'switch';
  const isModal = options && (options.modal || options.drawer);
  let fieldClass = `fr-field w-100 ${isComplex ? 'fr-field-complex' : ''}`;
  let labelClass = 'fr-label mb2';
  let contentClass = 'fr-content';
  switch (type) {
    case 'object':
      if (isModal) {
        break;
      }
      if (title) {
        labelClass += ' fr-label-object bb b--black-20 pb1 mt2 mb3'; // fr-label-object 无默认style，只是占位用于使用者样式覆盖
      }
      if (!isRoot) {
        fieldClass += ' fr-field-object'; // object的margin bottom由内部元素撑起
        if (title) {
          contentClass += ' ml3'; // 缩进
        }
      }
      break;
    case 'array':
      if (isModal) {
        break;
      }
      if (title && getEnum(schema) === undefined) {
        labelClass += ' fr-label-array mt2 mb3';
      }
      break;
    case 'boolean':
      if (isCheckbox) {
        if (title) {
          labelClass += ' ml2';
          labelClass = labelClass.replace('mb2', 'mb0');
        }
        contentClass += ' flex items-center'; // checkbox高度短，需要居中对齐
        fieldClass += ' flex items-center flex-row-reverse justify-end';
      }
      break;
    default:
      if (displayType === 'row') {
        labelClass = labelClass.replace('mb2', 'mb0');
      }
  }
  // 横排时
  if (displayType === 'row' && !isComplex && !isCheckbox) {
    fieldClass += ' flex items-center';
    labelClass += ' flex-shrink-0 fr-label-row';
    labelClass = labelClass.replace('mb2', 'mb0');
    contentClass += ' flex-grow-1 relative';
  }

  // 横排的checkbox
  if (displayType === 'row' && isCheckbox) {
    contentClass += ' flex justify-end pr2';
  }

  const _labelWidth = isLooselyNumber(labelWidth)
    ? Number(labelWidth)
    : isCssLength(labelWidth)
    ? labelWidth
    : 110; // 默认是 110px 的长度
  let labelStyle = { width: _labelWidth };
  if (isCheckbox) {
    labelStyle = { flexGrow: 1 };
  } else if (isComplex || displayType === 'column') {
    labelStyle = { flexGrow: 1 };
  }

  return (
    <div
      className={className ? `${className} ${fieldClass}` : fieldClass}
      style={columnStyle}
    >
      {showLabel && (
        <div className={labelClass} style={labelStyle}>
          <label
            className={`fr-label-title ${
              isCheckbox || displayType === 'column' ? 'no-colon' : ''
            }`} // boolean不带冒号
            title={title}
          >
            {objectCanCollapse && (
              <FoldIcon
                style={{ marginRight: 6 }}
                fold={collapsed}
                onClick={toggleCollapsed}
              />
            )}
            {isRequired && <span className="fr-label-required"> *</span>}
            <span
              className={`${isComplex ? 'b' : ''} ${
                displayType === 'column' ? 'flex-none' : ''
              }`}
            >
              {title}
            </span>
            {description &&
              (showDescIcon ? (
                <span className="fr-tooltip-toggle" aria-label={description}>
                  <i className="fr-tooltip-icon" />
                  <div className="fr-tooltip-container">
                    <i className="fr-tooltip-triangle" />
                    {description}
                  </div>
                </span>
              ) : (
                <span className="fr-desc ml2">(&nbsp;{description}&nbsp;)</span>
              ))}
            {displayType !== 'row' && validateText && (
              <span className="fr-validate">{validateText}</span>
            )}
          </label>
        </div>
      )}
      {/* TODO: animation or maybe using antd Collapse */}
      {objectCanCollapse && collapsed ? null : (
        <div
          className={contentClass}
          style={
            isCheckbox
              ? displayType === 'row'
                ? { marginLeft: _labelWidth }
                : {}
              : { flexGrow: 1 }
          }
        >
          <div className={`flex ${isComplex ? 'flex-column' : 'items-center'}`}>
            {children}
          </div>
          <span
            className={`fr-validate fr-validate-row ${
              isComplex ? 'relative' : 'absolute'
            }`}
          >
            {displayType === 'row' && validateText ? validateText : ''}
          </span>
        </div>
      )}
    </div>
  );
};
