import React, { Component } from 'react';
import classNames from 'classnames';
import { Tag, Icon } from 'antd';

import './TagSelect.less';

const { CheckableTag } = Tag;

const TagSelectOption = ({ children, checked, onChange, value }) => (
  <CheckableTag checked={checked} key={value} onChange={state => onChange(value, state)}>
    {children}
  </CheckableTag>
);

TagSelectOption.isTagSelectOption = true;

class TagSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      value: this.props.value || this.props.defaultValue || [],
    };
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange(value) {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  }

  getAllTags() {
    let { children } = this.props;
    children = React.Children.toArray(children);
    const checkedTags = children
      .filter(child => this.isTagSelectOption(child))
      .map(child => child.props.value);
    return checkedTags || [];
  }

  handleTagChange(value, checked) {
    const checkedTags = [...this.state.value];

    const index = checkedTags.indexOf(value);
    if (checked && index === -1) {
      checkedTags.push(value);
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1);
    }
    this.onChange(checkedTags);
  }

  handleExpand() {
    this.setState({
      expand: !this.state.expand,
    });
  }

  isTagSelectOption = (node) => {
    return (
      node &&
      node.type &&
      (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption')
    );
  }

  render() {
    const { value, expand } = this.state;
    const { children, className, style, expandable } = this.props;

    const cls = classNames('tagSelect', className, {
      hasExpandTag: expandable,
      expanded: expand,
    });
    return (
      <div className={cls} style={style}>
        {value &&
          React.Children.map(children, (child) => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: value.indexOf(child.props.value) > -1,
                onChange: this.handleTagChange,
              });
            }
            return child;
          })}
        {expandable && (
          <a className="trigger" onClick={this.handleExpand}>
            {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
          </a>
        )}
      </div>
    );
  }
}

TagSelect.Option = TagSelectOption;

export default TagSelect;
