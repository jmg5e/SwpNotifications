import Types from './types';

export const initialState = [];

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.MESSAGE_RECIEVED:
      return [...state, action.message];
    case Types.MESSAGES_DELETED:
      return [];
    default:
      return state;
  }
};

export default messagesReducer;
