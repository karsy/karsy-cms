import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './EmptyData.less';

const EmptyData = (props) => {
  const { type, style, children } = props;
  const iconMap = {
    normal: '//g.alicdn.com/uxcore/pic/empty.png'
  };
  return (
    <div
      className={classnames('empty-data', `empty-data-${type}`)}
      style={style}
    >
      <div
        className="empty-icon"
        style={{
          backgroundImage: `url(${iconMap[type]})`
        }}
      />
      <div className="empty-content">{children}</div>
    </div>
  );
};

EmptyData.propTypes = {
  style: PropTypes.object,
  type: PropTypes.oneOf(['normal', 'large'])
};

EmptyData.defaultProps = {
  children: '暂无数据',
  type: 'normal'
};

export default EmptyData;
