import { combineReducers } from 'redux';
import defaultState from './state.js';

const global = (state = defaultState.global, { type, payload }) => { // 全局通用配置
  switch (type) {
    case 'HAHA111':
    {
      const value = payload;
      alert(value);
      return {
        ...state,
        a: value
      };
    }
    default:
      return state;
  }
};

const home = (state = defaultState.home, { type, payload }) => {
  switch (type) {
    case 'HAHA222':
    {
      const value = payload;
      alert(value);
      return {
        ...state,
        a: value
      };
    }
    case 'CHANGE_KEY':
    {
      const value = payload;
      return {
        ...state,
        currentKey: value
      };
    }
    default:
      return state;
  }
};

const list = (state = defaultState.blog.list, { type, payload }) => {
  switch (type) {
    case 'CHANGE_SORT_KEY':
    {
      const value = payload;
      return {
        ...state,
        currentType: value
      };
    }
    case 'GET_SORTLIST':
    {
      const value = payload;
      return {
        ...state,
        sortList: value
      };
    }
    case 'GET_ARTICLE_LIST':
    {
      const value = payload;
      return {
        ...state,
        total: value.total,
        articleData: value.articleData,
        isSpin: false
      };
    }
    case 'CHANGE_PAGEPARAMS':
    {
      const value = payload;
      return {
        ...state,
        pageParams: value
      };
    }
    case 'CHANGE_QUERYDATA':
    {
      const value = payload;
      return {
        ...state,
        queryData: value
      };
    }
    case 'SWITCH_SPIN':
    {
      const value = payload;
      return {
        ...state,
        isSpin: value
      };
    }
    default:
      return state;
  }
};

// article路由配置
const article = (state = defaultState.blog.article, { type, payload }) => {
  switch (type) {
    case 'GET_ARTICLE_DETAIL':
    {
      const value = payload;
      return {
        ...state,
        articleDetail: value
      };
    }
    case 'SWITCH_SPIN':
    {
      const value = payload;
      return {
        ...state,
        isSpin: value
      };
    }
    default:
      return state;
  }
};

const blog = combineReducers({
  list,
  article
});

const reducer = combineReducers({
  global,
  home,
  blog
});

export default reducer;
