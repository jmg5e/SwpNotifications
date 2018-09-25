import productsReducer from 'features/products/reducer';
import Types from 'features/products/types';

describe('Products Reducer', () => {
  it('should have correct initial state', () => {
    expect(productsReducer(undefined, {})).toEqual({});
  });

  it('GET_PRODUCTS_SUCCESS should return correct state', () => {
    const newState = productsReducer(undefined, {
      type: Types.GET_PRODUCTS_SUCCESS,
      products: [
        {
          id: 1,
          name: 'product1',
          locationId: 11,
        },
        {
          id: 2,
          name: 'product2',
          locationId: 12,
        },
      ],
    });
    expect(newState).toEqual({
      1: { id: 1, name: 'product1', locationId: 11 },
      2: { id: 2, name: 'product2', locationId: 12 },
    });
  });

  it('CREATE_PRODUCT_SUCCESS should return correct state', () => {
    const newState = productsReducer(
      {
        1: { id: 1, name: 'product1', locationId: 11 },
        2: { id: 2, name: 'product2', locationId: 12 },
      },
      {
        type: Types.CREATE_PRODUCT_SUCCESS,
        product: { id: 3, name: 'product3', locationId: 13 },
      },
    );

    expect(newState).toEqual({
      1: { id: 1, name: 'product1', locationId: 11 },
      2: { id: 2, name: 'product2', locationId: 12 },
      3: { id: 3, name: 'product3', locationId: 13 },
    });
  });

  it('UPDATE_PRODUCT_SUCCESS should return correct state', () => {
    const newState = productsReducer(
      {
        1: { id: 1, name: 'product1', locationId: 11 },
        2: { id: 2, name: 'product2', locationId: 12 },
      },
      {
        type: Types.UPDATE_PRODUCT_SUCCESS,
        product: { id: 1, name: 'new name', locationId: 11 },
      },
    );
    expect(newState).toEqual({
      1: { id: 1, name: 'new name', locationId: 11 },
      2: { id: 2, name: 'product2', locationId: 12 },
    });
  });
  it('DELETE_PRODUCT_SUCCESS should return correct state', () => {
    const newState = productsReducer(
      {
        1: { id: 1, name: 'product1', locationId: 11 },
        2: { id: 2, name: 'product2', locationId: 12 },
      },
      { type: Types.DELETE_PRODUCT_SUCCESS, id: 1 },
    );
    expect(newState).toEqual({
      2: { id: 2, name: 'product2', locationId: 12 },
    });
  });
});
