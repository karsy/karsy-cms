export default {
  global: {
    a: '',
    b: {}
  },
  home: {
    a: '',
    currentKey: 'blog',
    b: {}
  },
  blog: {
    a: '',
    b: {},
    list: {
      currentType: 'all',
      sortList: [],
      isSpin: true,
      articleData: [],
      pageParams: {
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      queryData: {
        sort: 'all',
        key: '',
        type: 'all'
      }
    },
    // 文章路由state
    article: {
      articleDetail: {},
      isSpin: true
    }
  },
};
