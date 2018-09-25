import denormalize from 'utils/denormalize';

describe('denormalize', () => {
  it('denormalize return products with included location', () => {
    const products = {
      11: { id: 11, locationId: 21 },
      12: { id: 12, locationId: 22 },
    };
    const locations = {
      21: { id: 21, name: 'foo' },
      22: { id: 22, name: 'bar' },
    };
    expect(denormalize(products, locations, { key: 'locationId', mapTo: 'location' })).toEqual({
      11: { id: 11, locationId: 21, location: { id: 21, name: 'foo' } },
      12: { id: 12, locationId: 22, location: { id: 22, name: 'bar' } },
    });
  });

  it('denormalize should return empty object if key is not found', () => {
    const products = {
      11: { id: 11, locationId: 21 },
      12: { id: 12, locationId: 3 },
    };
    const locations = {
      21: { id: 21, name: 'foo' },
      22: { id: 22, name: 'bar' },
    };
    expect(denormalize(products, locations, { key: 'locationId', mapTo: 'location' })).toEqual({
      11: { id: 11, locationId: 21, location: { id: 21, name: 'foo' } },
      12: { id: 12, locationId: 3, location: { } },
    });
  });

  it('denormalize use transformFn if provided found', () => {
    const products = {
      11: { id: 11, name: 'product1', locationId: 21 },
      12: { id: 12, name: 'product2', locationId: 3 },
    };
    const locations = {
      21: { id: 21, name: 'foo', products: [11, 12] },
    };

    const getLocationProductNames = (loc, productList) => ({
      products: loc.products.map(id => productList[id].name),
    });

    expect(denormalize(locations, products, { transformFn: getLocationProductNames })).toEqual({
      21: { products: ['product1', 'product2'] },
    });
  });
});
