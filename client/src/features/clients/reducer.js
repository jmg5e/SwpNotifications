import * as R from 'ramda';
import Types from './types';

const clientsReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.CLIENTS:
      return R.indexBy(R.prop('id'), action.clients);
    case Types.CLIENT_CONNECTED:
      return R.assoc(action.client.id, action.client, state);
    case Types.CLIENT_DISCONNECTED:
      return R.dissoc(action.client.id, state);
    // case Types.CLIENT_GROUP_CHANGE:
    //   return R.assocPath([action.client.id], action.client, state);
    default:
      return state;
  }
};

export default clientsReducer;
