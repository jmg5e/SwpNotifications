import * as actions from 'features/products/actions';

describe('Products Action Creators', () => {
  it('actions should return object with type', () => {
    Object.keys(actions).forEach((key) => {
      expect(typeof actions[key]).toEqual('function');
      const action = actions[key]();
      expect(action).toEqual(expect.objectContaining({
        type: expect.any(String),
      }));
    });
  });
});
// it('getProducts', () => {
//   const action = getProducts();
//   expect(action).toEqual(expect.objectContaining({
//     type: expect.any(String),
//     success: expect.any(Function),
//   }));
// });
//
// it('createProduct', () => {
//   const newProduct = {
//     name: 'blah',
//     location: '500',
//     slot: '2a',
//   };
//   const action = createProduct(newProduct);
//
//   expect(action).toEqual(expect.objectContaining({
//     type: expect.any(String),
//     success: expect.any(Function),
//   }));
//
//   expect(action.requestOptions).toEqual(expect.objectContaining({
//     body: JSON.stringify(newProduct),
//   }));
// });
//
// it('deleteProduct', () => {
//   const action = deleteProduct(3);
//   expect(action).toEqual(expect.objectContaining({
//     type: expect.any(String),
//     success: expect.any(Function),
//   }));
// });
//
// it('updateProduct', () => {
//   const modifiedProduct = {
//     name: 'blah',
//     location: '500',
//     slot: '2a',
//   };
//   const action = updateProduct(modifiedProduct);
//   expect(action).toEqual(expect.objectContaining({
//     type: expect.any(String),
//     success: expect.any(Function),
//   }));
//
//   expect(action.requestOptions).toEqual(expect.objectContaining({
//     body: JSON.stringify(modifiedProduct),
//   }));
// });
// });
