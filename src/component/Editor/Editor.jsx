import React from 'react';
import mditor from 'mditor';

import './Editor.less';

const parser = new mditor.Parser();

console.log(parser.parse('** Hello mditor! **'));

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.myMditor = null;
  }

  getData() {
    return this.myMditor.value;
  }

  componentDidMount() {
    if (!this.myMditor) {
      this.myMditor = window.Mditor.fromTextarea(document.getElementById('editor'));
    }

    console.log(this.myMditor.value);
  }

  render() {
    return (
      <div className="editor">
        <textarea id="editor" defaultValue="123" />
      </div>
    );
  }
}

export default Editor;
