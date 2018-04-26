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
  render() {
    return (
      <Menu
        defaultSelectedKeys={['5']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>博客管理</span></span>}>
          <Menu.Item key="5">文章列表</Menu.Item>
          <Menu.Item key="6">新建文章</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>Option 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>Option 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="inbox" />
          <span>Option 3</span>
        </Menu.Item>
      </Menu>
    );
  }
}
