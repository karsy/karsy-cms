import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, List, Menu, Modal, Dropdown, Avatar, Upload } from 'antd';
import axios from 'axios';
import Dialog from '../../../../component/Dialog';
import { insertSortURL } from './const';

import './Sort.less';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.modalOk = this.modalOk.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  hideModal() {
    this.setState({
      visible: false,
    });
  }

  normFile(e) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  modalOk() {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      console.log(value);
      axios.post(insertSortURL, {
        name: value.name,
        type: value.type,
        description: value.description,
        logo: value.logo
      }).then((response) => {
        if (response.data.content.isSuccess) {
          Dialog.success({
            title: '温馨提示',
            content: '操作成功！',
            onOk: () => {
              location.reload();
            }
          });
        } else {
          Dialog.error({
            title: '温馨提示',
            content: '操作失败！',
          });
        }
      }).catch((error) => {
        console.log(error);
      });
      this.hideModal();
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 10,
      total: 20,
    };

    const list = [
      {
        name: '支付宝',
        logo: 'https://avatars3.githubusercontent.com/u/21785332?s=460&v=4',
        description: '哈哈哈哈哈哈哈哈哈',
        type: 'alipay',
        date: '2018-05-05'
      },
      {
        name: '淘宝',
        logo: 'https://avatars3.githubusercontent.com/u/21785332?s=460&v=4',
        description: '哈哈哈哈哈哈哈哈哈',
        type: 'taobao',
        date: '2018-05-05'
      }
    ];

    const ModalContent = (<Modal
      title="Modal"
      visible={this.state.visible}
      onOk={this.modalOk}
      onCancel={this.hideModal}
      okText="确认"
      cancelText="取消"
    >
      <Form layout="vertical">
        <FormItem
          label="名称"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '名称不能为空！' }],
          })(<Input placeholder="请输入分类名称" />)}
        </FormItem>
        <FormItem
          label="标识"
          extra="标识该分类的类型值（例如node、react、angular、reg等等）"
        >
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '标识不能为空！' }],
          })(<Input placeholder="请输入分类标识" />)}
        </FormItem>
        <FormItem
          label="描述"
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: '描述不能为空！' }],
          })(<TextArea placeholder="请输入分类描述" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
        <FormItem
          label="图标上传"
        >
          {getFieldDecorator('logo', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{ required: true, message: '图标不能为空！' }],
          })(
            <Upload name="logo" action="http://localhost:3001/upload.do" listType="picture" onChange={(res,a,b) => {
              debugger;
            }}>
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
      </Form>
    </Modal>
    );

    const ListContent = ({ data: { date } }) => {
      return (
        <div>
          <div>
            <span>创建时间</span>
            <p className="date">{date}</p>
          </div>
        </div>
      );
    };

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <div className="blog-sort">
        {ModalContent}
        <Button onClick={this.showModal} type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
          添加
        </Button>
        <List
          size="large"
          rowKey="id"
          loading={false}
          pagination={paginationProps}
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<a>编辑</a>, <MoreBtn />]}>
              <List.Item.Meta
                avatar={<Avatar src={item.logo} shape="square" size="large" />}
                title={item.name}
                description={item.description}
              />
              <ListContent data={item} />
            </List.Item>
          )}
        />
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

const WrappedSort = Form.create()(Sort);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSort);
