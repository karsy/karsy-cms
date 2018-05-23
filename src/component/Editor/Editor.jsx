import React from 'react';
import classnames from 'classnames';

// import 'mditor/dist/js/mditor';
// import 'mditor/dist/css/mditor.css';

import './Editor.less';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      errorStatus: false
    };
    this.myMditor = null;
    this.triggerChange = this.triggerChange.bind(this);
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
      this.myMditor && (this.myMditor.value = value);
      // this.triggerChange(value);
    }
  }

  componentDidMount() {
    this.myMditor = window.Mditor.fromTextarea(document.getElementById('editor'));
    this.myMditor.on('changed', () => {
      this.triggerChange(this.myMditor.value);
    });
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
          // onChange={(value) => {
          //   this.setState({ value }, () => {
          //     this.triggerChange(value);
          //   });
          // }}
        />
      </div>
    );
  }
}

export default Editor;
