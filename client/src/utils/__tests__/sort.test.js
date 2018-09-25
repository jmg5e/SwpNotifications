import sortByField from 'utils/sort';

const data = [
  {
    name: '4pk coke',
    location: '600',
    slot: '2a',
  },
  {
    name: '4pk sprite',
    location: '500',
    slot: '1a',
  },
];

describe('sort helper', () => {
  it('should return data sorted by location ascending', () => {
    const sorted = data.sort(sortByField('location'));
    expect(sorted[0].name).toEqual('4pk sprite');
    expect(sorted[1].name).toEqual('4pk coke');
  });

  it('should return data sorted by location descending', () => {
    const sorted = data.sort(sortByField('slot', false));
    expect(sorted[0].name).toEqual('4pk coke');
    expect(sorted[1].name).toEqual('4pk sprite');
  });

  it('should return unsorted data if key does not exists', () => {
    const sorted = data.sort(sortByField('foo'));
    expect(sorted).toEqual(data);
  });
});
