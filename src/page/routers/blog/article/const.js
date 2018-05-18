const checkRightToc = (lexer = []) => {
  let flag = true;
  const depth1 = lexer[0].depth;
  lexer.forEach((item) => {
    flag = depth1 <= item.depth;
  });
  return flag;
};

const addDepth = (tree, parDepth, subDepth) => {
  return tree;
};

const recursive = () => {

};

export const convertLexerToTree = (lexer = []) => {
  // 判断是否能构成目录
  if (!checkRightToc(lexer)) {
    console.error('当前结构不能构成目录！');
    return {};
  }
  let tree = {};
  let currentDepth = 100;
  if (lexer.length <= 0) return {};
  lexer.forEach((item) => {
    if (item.depth < currentDepth) {

    }
  });
  return tree;
};
export const a = 1;
