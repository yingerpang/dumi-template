export default {
  baseInfo: {
    title: "基本信息",
    fields: [
      {
        widget: "select",
        defaultValue: 1,
        name: "nodeType",
        label: "类型",
        rules: [
          {
            required: true,
            message: "类型不能为空",
          },
        ],
        disabled: true,
        hidden: true,
        // fields 设置 formItem 上的配置属性
        fields: {},
        options: {
          // 设置具体表单项上的配置项属性
          placeholder: "请选择节点类型",
          data: {
            0: "根节点",
            1: "目录分类",
            10: "资源事项",
            21: "资产事项(单事项)",
            22: "资产事项(主事项)",
            23: "资产事项(子事项)",
          },
        },
      },
      {
        name: "busiCode",
        label: "编码",
        widget: "textarea",
        hidden: false,
        options: {
          formElementOpts: {
            autoSize: { minRows: 1, maxRows: 6 },
          }
        },
        style: {
          width: "100%",
        },
      },
      {
        name: "nodename",
        label: "名称",
        widget: "textarea",
        defaultValue: "",
        required: true,
        hidden: false,
        options: {
          formElementOpts: {
            autoSize: { minRows: 1, maxRows: 6 },
          },
          // disabledInEdit: true //编辑状态时禁止编辑
        },
        style: {
          width: "100%",
        },
      },
      {
        name: "pathName",
        label: "路径",
        widget: "textarea",
        defaultValue: "",
        required: true,
        rules: [
          {
            required: true,
            message: "路径不能为空",
          },
        ],
        options: {
          placeholder: "请输入路径",
          autoSize: { minRows: 1, maxRows: 6 },
        },
        fields: {
          style: {
            width: "100%",
          },
        },
      },
      {
        name: "versionNo",
        label: "版本",
        widget: "input",
        hidden: true,
      },
      {
        name: "validState",
        label: "有效",
        widget: "radio",
        defaultValue: 1,
        hidden: false,
        options: {
          data: {
            "0": "否",
            "1": "是",
          },
        },
      },
      {
        name: "orderNo",
        label: "排序",
        widget: "input",
        hidden: false,
        rules: [
          {
            pattern: /^[0-9]+$/,
            message: "序号为数值类型",
          },
        ],
      },
      {
        name: "remark",
        label: "描述",
        widget: "textarea",
        defaultValue: "",
        hidden: false,
        options: {
          formElementOpts: {
            autoSize: { minRows: 1, maxRows: 6 },
          },
        },
        style: {
          width: "100%",
        },
      },
    ],
  },
  collectionRules: {
    title: "归集规则",
    fields: [
      {
        name: "archiveRule",
        label: "下级编码",
        widget: "textarea",
        defaultValue: "",
        options: {
          formElementOpts: {
            autoSize: { minRows: 1, maxRows: 6 },
            placeholder: '请输入下级编码匹配规则：*代表任何字符，?代表单个字符'
          },
        },
        style: {
          width: "100%",
        },
      },
    ],
  },
};