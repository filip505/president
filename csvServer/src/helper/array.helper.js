const sortAlphabetically = function (field) {
  return function (a, b) {
    if (a[field] < b[field]) { return -1; }
    if (a[field] > b[field]) { return 1; }
    return 0;
  }
}

const filterByField = function (field, value) {
  return (data) => !data[field].includes(value)
}

export {
  sortAlphabetically,
  filterByField
}