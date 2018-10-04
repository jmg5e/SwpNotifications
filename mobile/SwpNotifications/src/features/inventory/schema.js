import { schema } from 'normalizr';

export const Product = new schema.Entity('products', {}, {
});
export const Location = new schema.Entity('locations', {
  products: [Product],
}, {
  // processStrategy: (value, parent, key) => ({ ...value }),
});

// const Request = new normalizr.schema.Entity('requests', {
//   Product,
// });

export const ArrayOfLocations = new schema.Array(Location);

export const ArrayOfProducts = new schema.Array(Product);

// const locations = new schema.Entity('locations');
// export const products = new schema.Entity('products');
// export const locations = new schema.Entity('locations', {
//   products: [products],
// });
