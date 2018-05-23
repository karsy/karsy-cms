const getRecurseEmptyData = (sDepth, eDepth, item) => {
  if (sDepth === eDepth) {
    return [item];
  }
  const elem = [];
  elem.push({
    depth: sDepth,
    child: getRecurseEmptyData(sDepth + 1, eDepth, item)
  });
  return elem;
};

const pushRecurseData = (data, depth, item) => {
  const lastChild = data[data.length - 1];
  if (lastChild.depth === depth - 1) {
    if (!lastChild.child) {
      lastChild.child = [];
    }
    lastChild.child.push(item);
  } else if (lastChild.child) {
    lastChild.child = pushRecurseData(lastChild.child, depth, item);
  } else {
    lastChild.child = getRecurseEmptyData(lastChild.depth + 1, item.depth, item);
  }
  return data;
};

export const convertLexerToTree = (lexer = []) => {
  let ret = [];
  Array.isArray(lexer) && lexer.forEach((item) => {
    if (item.depth == 1) {
      ret.push(item);
    } else if (ret.length <= 0) {
      // 一. 先拿自己的depth，去跟已经存在的元素的最后一个比depth，会出现3种情况1.没有上一个元素，2.有上一个，比自己小或和自己一样，3.比自己大
      // 1.没有上一个元素，只需要判断长度，然后push一个递归的空的
      // 2.比自己小或相等，则需要再找前一个，总能找到一个比自己大1点的，然后把自己push进去
      // 3.比自己大，则把自己push进去上一个的child
      ret = getRecurseEmptyData(1, item.depth, item);
    } else {
      ret = pushRecurseData(ret, item.depth, item);
    }
  });
  return ret;
};
export const a = 1;
