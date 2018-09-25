const sortByField = (fieldName, ascending = true) => (a, b) => {
  if (fieldName in a === false || fieldName in b === false) {
    return 0;
  }
  if (ascending) return a[fieldName] > b[fieldName];
  return a[fieldName] < b[fieldName];
};

export default sortByField;
