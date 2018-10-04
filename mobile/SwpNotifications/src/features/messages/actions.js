import types from './types';

export const messageRecieved = message => ({
  type: types.MESSAGE_RECIEVED,
  message,
});

export const deleteMessages = () => ({
  type: types.MESSAGES_DELETED,
});
