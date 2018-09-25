import * as R from 'ramda';

const denormalize = (parent, children, { transformFn, key, mapTo = 'entity' }) => R.mapObjIndexed(item => (transformFn
  ? transformFn(item, children)
  : ({
    ...item,
    [mapTo]: R.propOr({}, item[key], children),
  })), parent);


export default denormalize;
