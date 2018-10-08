import Types from './types';

export const initialState = [];

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.MESSAGE_RECIEVED:
      return [...state, action.message];
    case Types.MESSAGES_DELETED:
      return [];
    case Types.MESSAGE_DELETED:
      return state.filter(msg => msg.id !== action.id);
    default:
      return state;
  }
};

export default messagesReducer;
