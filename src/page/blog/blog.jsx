import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu, Icon } from 'antd';
import { alertHaha333 } from '../../redux/action';

import './blog.less';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="blog">
        <Row>
          <Col span={4}>
            <div className="menu">
              <div className="top-search-bar">文章分类</div>
              <Menu
                defaultSelectedKeys={['1']}
                theme="light"
                mode="inline"
              >
                <Menu.Item key="1">
                  <Icon type="mail" />
                  Navigation One
                </Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu>
            </div>
          </Col>
          <Col span={16}>
            <div className="list">
              <div className="top-search-bar">文章列表</div>
              <div className="list-active">
                <div style={{ height: '2000px' }}>
                  <ul>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
          <Col span={4}>col-4</Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  alertHaha333: value => dispatch(alertHaha333(value))
});

const mapStateToProps = ({ global, blog }) => ({
  ...global,
  ...blog
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
