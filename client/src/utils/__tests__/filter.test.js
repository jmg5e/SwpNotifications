import filterItemByValue from 'utils/filter';

const data = [
  {
    name: 'blah',
  },
  {
    name: 'blahh',
  },
  {
    name: 'foo',
  },
];

describe('filter helpers', () => {
  it('filterItemByValue should return all if searchValue null', () => {
    const filteredData = data.filter(filterItemByValue('', 'name'));
    expect(filteredData).toEqual(data);
  });

  it('filterItemByValue should return searchValue matches', () => {
    const filteredData = data.filter(filterItemByValue('blah', 'name'));
    expect(filteredData).toEqual([{ name: 'blah' }, { name: 'blahh' }]);
  });

  it('filterItemByValue should return no matches', () => {
    const filteredData = data.filter(filterItemByValue('zzz', 'name'));
    expect(filteredData).toEqual([]);
  });

  /* TODO throw error? */
  it('filterItemByValue should return all if invalid searchKey', () => {
    const filteredData = data.filter(filterItemByValue('blah', 'nan'));
    expect(filteredData).toEqual(data);
  });
});
