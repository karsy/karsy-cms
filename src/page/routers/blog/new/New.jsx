import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import Editor from '../../../../component/Editor';
import Dialog from '../../../../component/Dialog';
import { insertArticleURL } from './const';

import './New.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const children = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.checkMdValue = this.checkMdValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  checkMdValue(rule, value, callback) {
    if (value && value.trim() !== '') {
      this.editor.changeErrorStatus(false);
      callback();
      return;
    }
    this.editor.changeErrorStatus(true);
    callback('文章内容不能为空!');
  }

  submit() {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      axios.post(insertArticleURL, {
        title: value.title,
        sort: value.sort,
        digest: value.digest,
        content: value.content
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
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="blog-new">
        <Form layout="vertical">
          <FormItem
            label="标题"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '标题不能为空！' }],
            })(<Input placeholder="请输入文章标题" />)}
          </FormItem>
          <FormItem
            label="分类"
          >
            {getFieldDecorator('sort', {
              initialValue: 'a1',
              rules: [{ required: true, message: '分类不能为空！' }],
            })(<Select
              size="default"
              style={{ width: 200 }}
            >
              {children}
            </Select>)}
          </FormItem>
          <FormItem
            label="摘要"
          >
            {getFieldDecorator('digest', {
              rules: [{ required: true, message: '摘要不能为空！' }],
            })(<TextArea placeholder="请输入文章摘要" autosize={{ minRows: 2, maxRows: 6 }} />)}
          </FormItem>
          <FormItem
            label="文章内容"
          >
            {getFieldDecorator('content', {
              // initialValue: 'fewjojfew',
              rules: [{ validator: this.checkMdValue }],
            })(<Editor ref={(resp) => { this.editor = resp; }} />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" onClick={this.submit}>提交</Button>
          </FormItem>
        </Form>
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

const WrappedNew = Form.create()(New);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNew);
