const filterItemByValue = (searchValue, searchKey) => (item) => {
  /* TODO throw error if key does not exist? */
  if (searchKey in item === false) {
    return true;
  }
  if (searchValue.length > 0) {
    return RegExp(searchValue, 'gi').test(item[searchKey]);
  }
  return true;
};

export default filterItemByValue;
