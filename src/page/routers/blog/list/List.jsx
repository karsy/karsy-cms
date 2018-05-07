import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import axios from 'axios';

import './List.less';

const FormItem = Form.Item;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="blog-list">
        我是list页面
        <div>
          <Form
            className="ant-advanced-search-form"
            layout="inline"
            onSubmit={this.handleSearch}
          >
            <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  label="field1"

                >
                  {getFieldDecorator('field1', {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  })(
                    <Input placeholder="placeholder" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="field2"

                >
                  {getFieldDecorator('field2', {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  })(
                    <Input placeholder="placeholder" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="field3"
                >
                  {getFieldDecorator('field3', {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  })(
                    <Input placeholder="placeholder" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={16} />
              <Col span={8} >
                <FormItem
                  label="field312"
                >
                  {getFieldDecorator('field3', {
                    rules: [{
                      required: true,
                      message: 'Input something!',
                    }],
                  })(
                    <Input placeholder="placeholder" />
                  )}
                </FormItem>
                {/* <FormItem label="1">
                  <Button type="primary" htmlType="submit">Search</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    Clear
                  </Button>
                </FormItem> */}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // changeCurrentKey: value => dispatch(changeCurrentKey(value))
});

const mapStateToProps = ({ home, global }) => ({
  ...home,
  ...global
});

const WrappedList = Form.create()(List);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedList);
