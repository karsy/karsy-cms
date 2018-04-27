import React from 'react';
import mditor from 'mditor';
import { Input } from 'antd';
import classnames from 'classnames';

// import 'mditor/dist/js/mditor';
// import 'mditor/dist/css/mditor.css';

import './Editor.less';

const parser = new mditor.Parser();
const { TextArea } = Input;

console.log(parser.parse('** Hello mditor! **'));

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      errorStatus: false
    };
    this.myMditor = null;
  }

  getData() {
    return this.myMditor.value;
  }

  changeErrorStatus(flag) {
    this.setState({ errorStatus: flag });
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  }

  componentDidMount() {
    // if (!this.myMditor) {
    //   this.myMditor = window.Mditor.fromTextarea(document.getElementById('editor'));
    // }
    const myMditor = window.Mditor.fromTextarea(document.getElementById('editor'));

    myMditor.on('ready', () => {
    });
    myMditor.on('changed', () => {
      // this.setState({ errorStatus: myMditor.value.trim() === '' });
      this.triggerChange(myMditor.value);
    });

    // console.log(this.myMditor.value);
  }

  triggerChange(value) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    return (
      <div className={classnames('editor', { error: this.state.errorStatus })}>
        <textarea
          id="editor"
          defaultValue={this.state.value}
          placeholder="请输入文章内容"
        />
      </div>
    );
  }
}

export default Editor;
