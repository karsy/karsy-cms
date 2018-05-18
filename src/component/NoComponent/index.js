export default (props) => {
  if (props.loading) {
    return null;
  }
  return props.children;
};
