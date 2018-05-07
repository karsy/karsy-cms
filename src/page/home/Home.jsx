import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { changeCurrentKey } from '../../redux/action';
import { menuData } from './const';
import SiderMenu from '../../component/SiderMenu';
import New from '../../page/routers/blog/new';
import List from '../../page/routers/blog/list';
import Sort from '../../page/routers/blog/sort';

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
              {/* <Route path={`${match.url}/blog`} component={New} /> */}
              <Route path={`${match.url}/blog/new`} component={New} />
              <Route path={`${match.url}/blog/list`} component={List} />
              <Route path={`${match.url}/blog/sort`} component={Sort} />
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
