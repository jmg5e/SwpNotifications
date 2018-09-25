/* eslint-disable */
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // console.log('loading development configureStore');
  module.exports = require('./configureStore.dev');
} else {
  // console.log('loading production configureStore');
  module.exports = require('./configureStore.prod');
}
