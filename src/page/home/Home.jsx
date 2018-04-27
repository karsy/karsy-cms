import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { changeCurrentKey } from '../../redux/action';
import { menuData } from './const';
import SiderMenu from '../../component/SiderMenu';
import Editor from '../../component/Editor';
import New from '../../page/routers/blog/new';

import './Home.less';

const { Sider, Header, Footer, Content } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { match } = this.props;
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
            <SiderMenu menuData={menuData} />
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
              <Route exact path={`${match.url}`} component={New} />
              <Route path={`${match.url}/blog`} component={New} />
              <Route path={`${match.url}/openSource`} render={() => <h3>Please select a openSource.</h3>} />
              <Route path={`${match.url}/tool`} render={() => <h3>Please select a tool.</h3>} />
              <Route path={`${match.url}/message`} render={() => <h3>Please select a message.</h3>} />
              <Route path={`${match.url}/about`} render={() => <h3>Please select a about.</h3>} />
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
