import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import {
  getArticleById,
  emptyCacheData,
  insertArticle,
  updateArticle
} from '../../../../redux/action';
import Editor from '../../../../component/Editor';
import Dialog from '../../../../component/Dialog';

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
    this.checkMaxLength = this.checkMaxLength.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { match, getArticleById, emptyCacheData } = this.props;
    if (match.params.id) {
      getArticleById(match.params.id);
    } else {
      emptyCacheData();
    }
  }

  componentWillUnmount() {
    this.props.form.resetFields();
  }

  checkMdValue(rule, value, callback) {
    if (value && value.trim() !== '') {
      this.editor.changeErrorStatus(false);
      callback();
      return;
    }
    this.editor.changeErrorStatus(true);
    callback('文章内容不能为空！');
  }

  checkMaxLength = (maxLength, rule, value, callback) => {
    if (value.trim().length <= maxLength) {
      callback();
      return;
    }
    callback(`最大长度为${maxLength}！`);
  }

  submit() {
    const { form, match } = this.props;
    form.validateFields((err, value) => {
      if (err) {
        return;
      }
      const callback = {
        success: () => {
          Dialog.success({
            title: '温馨提示',
            content: '操作成功！',
            onOk: () => {
              location.reload();
            }
          });
        },
        error: () => {
          Dialog.error({
            title: '温馨提示',
            content: '操作失败！',
          });
        }
      };
      if (match.params.id) {
        updateArticle(value, match.params.id)(callback);
      } else {
        insertArticle(value)(callback);
      }
    });
  }

  render() {
    const { articleDetail } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="blog-new">
        <Form layout="vertical">
          <FormItem
            label="标题"
          >
            {getFieldDecorator('title', {
              initialValue: articleDetail.title || '',
              rules: [{ required: true, message: '标题不能为空！' }, { validator: this.checkMaxLength.bind(this, 20) }],
            })(<Input placeholder="请输入文章标题" />)}
          </FormItem>
          <FormItem
            label="分类"
          >
            {getFieldDecorator('sort', {
              // initialValue: articleDetail.sort || null,
              ...(articleDetail.sort ? { initialValue: articleDetail.sort } : {}),
              rules: [{ required: true, message: '分类不能为空！' }],
            })(<Select
              size="default"
              style={{ width: 200 }}
              placeholder="请选择分类"
            >
              {children}
            </Select>)}
          </FormItem>
          <FormItem
            label="摘要"
          >
            {getFieldDecorator('digest', {
              initialValue: articleDetail.digest || '',
              rules: [{ required: true, message: '摘要不能为空！' }, { validator: this.checkMaxLength.bind(this, 200) }],
            })(<TextArea placeholder="请输入文章摘要" autosize={{ minRows: 2, maxRows: 6 }} />)}
          </FormItem>
          <FormItem
            label="文章内容"
          >
            {getFieldDecorator('content', {
              initialValue: articleDetail.content || '',
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
  getArticleById: id => dispatch(getArticleById(id)),
  emptyCacheData: () => dispatch(emptyCacheData())
});

const mapStateToProps = ({ blog, global }) => ({
  ...global,
  ...blog.new
});

const WrappedNew = Form.create()(New);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNew);
