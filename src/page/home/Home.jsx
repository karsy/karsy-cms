import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { changeCurrentKey } from '../../redux/action';
import { menuData } from './const';
import SiderMenu from '../../component/SiderMenu';
import Editor from '../../component/Editor';

import './Home.less';

const { Sider, Header, Footer, Content } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleClick(e) {
    const { history } = this.props;
    console.log('click ', e);
    if (e.key === this.props.currentKey) return;
    this.props.changeCurrentKey(e.key);
    history.push(`/home/${e.key}`);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div className="home">
        <Layout className="layout">
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            width={256}
          >
            <div className="logo" />
            <SiderMenu />
          </Sider>
          <Layout>
            <Header>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content>
              <Editor />
            </Content>
            <Footer>我们是共产主义接班人</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeCurrentKey: value => dispatch(changeCurrentKey(value))
});

const mapStateToProps = ({ home, global }) => ({
  ...home,
  ...global
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
