import React from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Select, Pagination, Spin } from 'antd';
import dayjs from 'dayjs';
import EmptyData from '../../../../component/EmptyData';
import NoComponent from '../../../../component/NoComponent';
import Dialog from '../../../../component/Dialog';
import {
  changeSort,
  getSortList,
  getArticleList,
  switchSpin,
  changePageParams,
  changeQueryData,
  deleteArticle
} from '../../../../redux/action';
import { queryOpitons } from './const';

import './List.less';

const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.type = 'all';
    this.handleClick = this.handleClick.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.onSwitchPage = this.onSwitchPage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onModify = this.onModify.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const { getSortList, getArticleList, pageParams, queryData } = this.props;
    getSortList();
    getArticleList(pageParams, queryData);
  }

  handleClick(value) {
    const { changeSort, getArticleList, pageParams, queryData } = this.props;
    changeSort(value);
    getArticleList(pageParams, { ...queryData, sort: value });
  }

  handleArticleClick(id) {
    const { history } = this.props;
    history.push(`/home/blog/article/${id}`);
  }

  onSwitchPage(page, pageSize) {
    const { getArticleList, changePageParams, queryData } = this.props;
    getArticleList({ currentPage: page, pageSize }, queryData);
    changePageParams({ currentPage: page, pageSize });
  }

  onSearch(value) {
    const { getArticleList, changeQueryData, changePageParams, queryData, pageParams } = this.props;
    getArticleList({ ...pageParams, currentPage: 1 }, { ...queryData, key: value });
    changePageParams({ ...pageParams, currentPage: 1 });
    changeQueryData({ ...queryData, key: value });
  }

  onModify = (id) => {
    console.log(id);
    const { history } = this.props;
    history.push(`/home/blog/new/${id}`);
  }

  onDelete(id) {
    const { deleteArticle } = this.props;
    Dialog.confirm({
      title: '确定删除该文章吗？',
      content: '删除之后将不可恢复',
      okType: 'danger',
      onOk() {
        deleteArticle({
          id,
          success: () => {
            Dialog.success({
              title: '温馨提示',
              content: '操作成功',
              onOk: () => {
                location.reload();
              }
            });
          },
          fail: () => {
            Dialog.error({
              title: '温馨提示',
              content: '操作失败'
            });
          }
        });
      }
    });
  }

  renderMenu() {
    const { sortList, currentType } = this.props;
    const menuItems = sortList.map((item, index) => <Option key={index} value={item.type}>{item.name}</Option>);
    return (
      <div className="menu">
        <span>分类</span>
        <Select
          onChange={this.handleClick}
          value={currentType}
        >{menuItems}</Select>
      </div>
    );
  }

  renderSearchBar() {
    const { changeQueryData, queryData } = this.props;
    const queryOpitonList = queryOpitons.map((item, index) => <Option key={index} value={item.key}>{item.value}</Option>);
    return (
      <div className="top-search-bar">
        <span>文章列表</span>
        { this.renderMenu() }
        <span className="top-search-bar-search">
          <InputGroup compact>
            <Select
              onChange={(value) => { changeQueryData({ ...queryData, type: value }); }}
              defaultValue="all"
            >{queryOpitonList}</Select>
            <Search
              placeholder="请输入关键字"
              onSearch={this.onSearch}
              style={{ width: 240 }}
              enterButton
            />
          </InputGroup>
        </span>
      </div>
    );
  }

  renderArticleList() {
    const { articleData, isSpin } = this.props;
    const articleComponent = articleData && articleData.length ? articleData.map((item) => {
      return (
        <li
          className="li-article"
          key={item.id}
        >
          <p className="article-title">{item.title}</p>
          <p className="article-sort-calendar">
            <span><Icon type="profile" />{item.sort}</span>
            <span><Icon type="calendar" />{dayjs(item.date).format('YYYY-MM-DD')}</span>
          </p>
          <p className="article-digest">{item.digest}</p>
          <p className="article-op">
            <span onClick={this.handleArticleClick.bind(this, item.id)}>预览</span>
            <span onClick={this.onModify.bind(this, item.id)}>编辑</span>
            <span onClick={this.onDelete.bind(this, item.id)}>删除</span>
          </p>
        </li>
      );
    }) : <EmptyData />;
    return (
      <Spin size="large" spinning={isSpin} delay={500}>
        <div className="list-article">
          <NoComponent loading={isSpin}>
            <ul>{articleComponent}</ul>
          </NoComponent>
        </div>
      </Spin>
    );
  }

  renderPagination() {
    const { articleData, pageParams, total } = this.props;
    if (!(articleData && articleData.length)) {
      return null;
    }
    return (
      <Pagination
        showQuickJumper
        pageSize={pageParams.pageSize}
        current={pageParams.currentPage}
        total={total}
        showSizeChanger
        pageSizeOptions={['5', '10', '20', '50']}
        showTotal={total => `共 ${total} 条`}
        onChange={this.onSwitchPage}
        onShowSizeChange={(page, pageSize) => { this.onSwitchPage(1, pageSize); }}
      />
    );
  }

  render() {
    return (
      <div className="blog">
        <div className="list">
          { this.renderSearchBar() }
          { this.renderArticleList() }
          { this.renderPagination() }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeSort: key => dispatch(changeSort(key)),
  getSortList: () => dispatch(getSortList()),
  getArticleList: (pageParams, queryData) => dispatch(getArticleList(pageParams, queryData)),
  changePageParams: value => dispatch(changePageParams(value)),
  changeQueryData: value => dispatch(changeQueryData(value)),
  switchSpin: value => dispatch(switchSpin(value)),
  deleteArticle: id => deleteArticle(id)
});

const mapStateToProps = ({ global, blog }) => ({
  ...global,
  ...blog.list
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
