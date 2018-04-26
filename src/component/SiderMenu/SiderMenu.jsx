import React from 'react';
import { Menu, Icon } from 'antd';

import './SiderMenu.less';

const SubMenu = Menu.SubMenu;

export default class SiderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
        defaultSelectedKeys={['5']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        {this.getMenuItems()}
      </Menu>
    );
  }
}
