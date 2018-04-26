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
