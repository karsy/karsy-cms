import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import highlight from 'highlight.js';
import { Anchor, Icon, Spin } from 'antd';
import dayjs from 'dayjs';
import NoComponent from '../../../../component/NoComponent';
import {
  getArticleById
} from '../../../../redux/action';
import { convertLexerToTree } from './const';

import './article.less';

const { Link } = Anchor;

// 源码如下：
// Renderer.prototype.heading = (text, level, raw) => {
//   if (this.options.headerIds) {
//     return '<h'
//       + level
//       + ' id="'
//       + this.options.headerPrefix
//       + raw.toLowerCase().replace(/[^\w]+/g, '-')
//       + '">'
//       + text
//       + '</h'
//       + level
//       + '>\n';
//   }
//   // ignore IDs
//   return '<h' + level + '>' + text + '</h' + level + '>\n';
// };

// 重写heading源码，自定义render，同时修复``转成code的问题，让id = text（当出现两个相同的toc时，会生成两个同样的id，这点待fix）
marked.Renderer.prototype.heading = (text, level) => {
  const rules = [
    { from: /<code>/g, to: '`' },
    { from: /<\/code>/g, to: '`' }
  ];
  const saveText = text;
  let decodeText = text;
  rules.forEach((item) => { decodeText = decodeText.replace(item.from, item.to); });
  return `<h${level} id="${decodeText}">${saveText}</h${level}>\n`;
};

// 设置语法高亮
marked.setOptions({
  highlight: (code) => {
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const { match, getArticleById } = this.props;
    getArticleById(match.params.id);
  }

  render() {
    const { isSpin, articleDetail } = this.props;
    // console.log(JSON.stringify(this.props.articleDetail));
    const mdHtml = marked(this.props.articleDetail.content || '');
    const lexerData = marked.lexer(this.props.articleDetail.content || '').filter(item => item.type === 'heading');
    const isShowToc = lexerData.length >= 1;
    // console.log(lexerData);
    // const tocX = toc(this.props.articleDetail.content || '');
    // console.log(tocRender(this.props.articleDetail.content || ''));
    // console.log(tocX);
    const tocComponent = lexerData.map((item) => {
      return (
        <Link key={`${item.depth}-${item.text}`} href={`#${item.text}`} title={item.text} />
      );
    });
    return (
      <Spin size="large" spinning={isSpin}>
        <div className="article">
          <NoComponent loading={!mdHtml}>
            <div className="article-post" style={{ width: `${isShowToc ? 800 : 1080}px` }}>
              <div className="article-title">{articleDetail.title}</div>
              <div className="article-sort-calendar">
                <span><Icon type="profile" />{articleDetail.sort}</span>
                <span>
                  <Icon type="calendar" />
                  { articleDetail.date ? dayjs(articleDetail.date).format('YYYY-MM-DD') : ''}
                </span>
              </div>
              <div className="article-digest"><span>摘要：</span>{articleDetail.digest}</div>
              <div className="readme">
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: mdHtml }} />
              </div>
            </div>
            { isShowToc ? (
              <div className="toc-box">
                <Anchor>
                  <div className="toc">
                    <span className="toc-title">文章目录</span>
                    {tocComponent}
                  </div>
                </Anchor>
              </div>
            ) : null }
          </NoComponent>
        </div>
      </Spin>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getArticleById: id => dispatch(getArticleById(id))
});

const mapStateToProps = ({ global, blog }) => ({
  ...global,
  ...blog.article
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
