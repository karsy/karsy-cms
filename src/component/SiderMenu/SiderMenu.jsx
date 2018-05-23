import React from 'react';
import { Menu, Icon } from 'antd';

import './SiderMenu.less';

const SubMenu = Menu.SubMenu;

export default class SiderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(e.key, e.keyPath.reverse().join('/'));
  }

  getMenuItems(menuData = this.props.menuData) {
    return menuData.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.path}
            title={<span>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.name}</span></span>}
          >
            {this.getMenuItems(item.children)}
          </SubMenu>
        );
      }
      return <Menu.Item key={item.path}>{item.name}</Menu.Item>;
    });
  }

  render() {
    return (
      <Menu
        defaultSelectedKeys={['list']}
        defaultOpenKeys={['blog']}
        mode="inline"
        theme="dark"
        onClick={this.handleClick}
      >
        {this.getMenuItems()}
      </Menu>
    );
  }
}
