import * as R from 'ramda';
import Types from './types';

export const initialState = {
  action: {},
  history: {},
};

const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.REQUESTS_LOADED:
      return { ...state, active: R.indexBy(R.prop('id'), action.requests) };
    case Types.REQUEST_RECIEVED:
    case Types.PRODUCT_REQUEST_SUCCESS:
      return R.assocPath(['active', action.request.id], action.request, state);
    case Types.REQUESTS_DISMISSED:
    case Types.REQUESTS_DISMISSED_SUCCESS:
      return {
        ...state,
        active: R.omit(action.event.requests.map(r => r.id), state.active),
        history: R.merge({
          [action.event.eventId]: {
            ...action.event,
          },
        }, state.history),
      };
    case Types.HISTORY_CLEARED:
      return R.assoc('history', {}, state);
    default:
      return state;
  }
};

export default requestsReducer;
