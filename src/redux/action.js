
import axios from 'axios';

export const switchSpin = value => (dispatch) => {
  dispatch({
    type: 'SWITCH_SPIN',
    payload: value
  });
};

export const changeCurrentKey = value => (dispatch) => {
  dispatch({
    type: 'CHANGE_KEY',
    payload: value
  });
};

export const alertHaha111 = value => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'HAHA111',
      payload: value
    });
  }, 1000);
};

export const alertHaha222 = value => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'HAHA222',
      payload: value
    });
  }, 1000);
};

export const alertHaha333 = value => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'HAHA333',
      payload: value
    });
  }, 1000);
};

export const changeSort = key => (dispatch) => {
  dispatch({
    type: 'CHANGE_SORT_KEY',
    payload: key
  });
};

export const getSortList = () => (dispatch) => {
  const value = [
    {
      name: '全部',
      type: 'all',
      logo: '',
      description: 'react是一个很牛逼的框架',
      date: '2018-05-05'
    },
    {
      name: 'kissy框架',
      type: 'kissy',
      logo: '',
      description: 'react是一个很牛逼的框架',
      date: '2018-05-05'
    },
    {
      name: 'react框架',
      type: 'react',
      logo: '1',
      description: 'react是一个很牛逼的框架',
      date: '2018-05-05'
    },
    {
      name: 'ant框架',
      type: 'ant',
      logo: '2',
      description: 'ant是一个很牛逼的框架',
      date: '2018-05-05'
    },
    {
      name: 'node框架',
      type: 'node',
      logo: '3',
      description: 'node是一个很牛逼的框架',
      date: '2018-05-05'
    }
  ];
  axios.get('/user?ID=12345')
    .then((response) => {
      console.log(response);
      dispatch({
        type: 'GET_SORTLIST',
        payload: value
      });
      // dispatch({
      //   type: 'CHANGE_SORT_KEY',
      //   payload: value.length ? value[0].type : ''
      // });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: 'GET_SORTLIST',
        payload: value
      });
      // dispatch({
      //   type: 'CHANGE_SORT_KEY',
      //   payload: value.length ? value[0].type : ''
      // });
    });
};

export const getArticleList = (pageParams, queryData) => (dispatch) => {
  switchSpin(true)(dispatch);
  axios.get('http://localhost:3001/blog/queryArticle', {
    params: {
      type: queryData.type,
      key: queryData.key,
      sort: queryData.sort,
      currentPage: pageParams.currentPage,
      pageSize: pageParams.pageSize
    }
  })
    .then((response) => {
      const articleData = response.data.content.retValue;
      const total = response.data.content.total;
      switchSpin(false)(dispatch);
      dispatch({
        type: 'GET_ARTICLE_LIST',
        payload: { total, articleData }
      });
    });
};

export const changePageParams = value => (dispatch) => {
  dispatch({
    type: 'CHANGE_PAGEPARAMS',
    payload: value
  });
};

export const changeQueryData = value => (dispatch) => {
  dispatch({
    type: 'CHANGE_QUERYDATA',
    payload: value
  });
};

export const deleteArticle = ({ id, success, fail }) => {
  axios.get('http://localhost:3001/blog/deleteArticle', {
    params: {
      id
    }
  })
    .then((response) => {
      const data = response.data.content;
      if (data.isSuccess) {
        success();
      } else {
        fail();
      }
    })
    .catch((err) => {
      console.error(err);
      fail();
    });
};

/**  文章详情页  **/
export const getArticleById = id => (dispatch) => {
  axios.get('http://localhost:3001/blog/getArticleById', {
    params: {
      id
    }
  })
    .then((response) => {
      const data = response.data.content.retValue;
      switchSpin(false)(dispatch);
      dispatch({
        type: 'GET_ARTICLE_DETAIL',
        payload: data
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getMenuList = () => (dispatch) => {
  axios.get('http://localhost:3001/queryMenu')
    .then((response) => {
      const data = response.data.content.retValue;

      const getMenuListById = (data, parentId) => {
        const menu = [];
        data.forEach((item) => {
          if (item.parent === parentId) {
            // data.splice(index, 1);
            item.children = getMenuListById(data, item.id);
            menu.push(item);
          }
        });
        return menu;
      };
      dispatch({
        type: 'GET_MENULIST',
        payload: getMenuListById(data, 0)
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const emptyCacheData = () => (dispatch) => {
  dispatch({
    type: 'GET_ARTICLE_DETAIL',
    payload: {}
  });
};

export const insertArticle = value => (cb) => {
  axios.post('http://localhost:3001/blog/insertArticle', {
    ...value
  }).then((response) => {
    if (response.data.content.isSuccess) {
      cb.success();
    } else {
      cb.error();
    }
  }).catch((error) => {
    console.error(error);
  });
};

export const updateArticle = (value, id) => (cb) => {
  axios.post('http://localhost:3001/blog/updateArticle', {
    ...value,
    id
  }).then((response) => {
    if (response.data.content.isSuccess) {
      cb.success();
    } else {
      cb.error();
    }
  }).catch((error) => {
    console.error(error);
  });
};

