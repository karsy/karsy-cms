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

const blog = (state = defaultState.blog, { type, payload }) => {
  switch (type) {
    case 'HAHA333':
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

const reducer = combineReducers({
  global,
  home,
  blog
});

export default reducer;
