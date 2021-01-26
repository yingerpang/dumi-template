import React, { Component, Fragment } from 'react';
import { Select, Spin, Tree } from 'antd';
import uuid from 'uuid';
//import '../CategoryTree/index.less'

import _isEqual from 'lodash/isEqual';
const { Option } = Select;

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

export default class MultiSelectTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      checkedKeys: this.props.checkedKeys,
      expandedKeys: this.props.expandedKeys,
      currentCateCode: this.props.currentCateCode || null,
      currentSelect: {},
      isLoading: true,
      autoExpandParent: true,
      cataData: [],
    };
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    this.loadData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.currentCateCode &&
      nextProps.currentCateCode !== prevState.currentCateCode
    ) {
      return {
        currentCateCode: nextProps.currentCateCode,
      };
    }
    return null;
  }

  loadData = () => {
    const { currentCateCode } = this.props;
    this.setState({
      isLoading: false,
      cataData: [
        { cataCode: 1, cataName: 'treeone' },
        { cataCode: 2, cataName: 'treetwo' },
      ],
      currentCateCode: 1,
    });
    this.loadCategoryTree();
    // this.props.systemState.getCategoryPage({
    //   orderBy: 'order_seq asc',
    //   validState: 1,
    //   catatype: 1,
    //   pageSize: 1000
    // }).then(rs => {
    //   this.setState({
    //     cataData: rs.list,
    //     currentCateCode: currentCateCode ? currentCateCode : rs.list && rs.list.length ? rs.list[0].cataCode : null
    //   })
    //   if (rs.list && rs.list.length) {
    //     this.loadCategoryTree({
    //       cataCode: currentCateCode ? currentCateCode : rs.list[0].cataCode,
    //       // viewCode: 'RES_ITEM_EDIT'
    //     })
    //   }
    // })
  };

  // 渲染节点标题和不同状态的操作按钮
  renderTitle = node => {
    return (
      <div className="title-wrap">
        <p className="word-wrap">
          <span title={node.nodeName}>{node.nodeName}</span>
        </p>
      </div>
    );
  };

  loadCategoryTree = (params, callback) => {
    this.setState({
      isLoading: true,
    });
    //return this.props.resourceState.getAllTree({...params}).then(rs => {
    this.loadDataCallback();
    //})
  };

  loadDataCallback = rs => {
    const data = treeData;
    const { expandedKeys } = this.props;
    this.setState({
      treeData: data,
      isLoading: false,
      expandedKeys: expandedKeys.length
        ? expandedKeys
        : data.length
        ? [data[0].key]
        : [],
    });
  };

  // 重写节点的 title
  updateTreeData = list => {
    const checkableType = [10];
    return list.map(node => {
      node.key = node.nodeCode;
      node.title = this.renderTitle(node);
      node.selectable = false;
      node.icon = false;
      node.checkable = checkableType.includes(node.nodeType);
      if (node.children) {
        this.updateTreeData(node.children);
      }
      return node;
    });
  };

  handleCheck = (checkedKeys, { checked, checkedNodes, halfCheckedKeys }) => {
    this.setState({
      checkedKeys,
    });
    this.props.getSelected(checkedKeys, {
      checked,
      checkedNodes,
      halfCheckedKeys,
    });
  };

  handleOnExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  handleCateChange = key => {
    // this.setState({
    //   currentCateCode: key,
    // })
    this.loadCategoryTree({
      cataCode: key,
      // viewCode: this.props.viewCode
    });
    this.props.cataChange(key);
  };

  render() {
    const {
      treeData,
      isLoading,
      checkedKeys,
      expandedKeys,
      autoExpandParent,
      cataData,
      currentCateCode,
    } = this.state;
    const { treeOption } = this.props;
    return (
      <div className="tree-wrap">
        {isLoading ? (
          <Spin />
        ) : treeData.length ? (
          <Fragment>
            <div className="header">
              <Select
                value={currentCateCode}
                style={{ width: '100%' }}
                onChange={this.handleCateChange}
              >
                {cataData.map(item => (
                  <Option value={item.cataCode} key={item.cataCode}>
                    {item.cataName}
                  </Option>
                ))}
              </Select>
            </div>
            <Tree
              key={uuid()}
              checkable
              treeData={treeData}
              autoExpandParent={autoExpandParent}
              showLine={{ showLeafIcon: false }}
              onCheck={this.handleCheck}
              onExpand={this.handleOnExpand}
              checkedKeys={checkedKeys}
              expandedKeys={expandedKeys}
              {...treeOption}
            />
          </Fragment>
        ) : (
          <p className="none">该目录下暂无数据</p>
        )}
      </div>
    );
  }
}
