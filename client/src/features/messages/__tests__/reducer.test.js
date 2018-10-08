import messagesReducer, { initialState } from 'features/messages/reducer';
import * as messageActions from 'features/messages/actions';

describe('Messages Reducer', () => {
  it('should have correct initial state', () => {
    expect(messagesReducer(undefined, {})).toEqual(initialState);
  });

  it('message Recieved should return correct state', () => {
    const state = [{ id: 'msg1', from: 'user1', text: 'hello' }];
    const newState = messagesReducer(
      state,
      messageActions.messageRecieved({
        id: 'msg2',
        from: 'user1',
        text: 'new message',
      }),
    );
    expect(newState).toEqual([
      { id: 'msg1', from: 'user1', text: 'hello' },
      { id: 'msg2', from: 'user1', text: 'new message' },
    ]);
  });

  it('delete all messages should return correct state', () => {
    const state = [
      { id: 'msg1', from: 'user1', text: 'hello' },
      { id: 'msg2', from: 'user1', text: 'hello again' },
    ];
    const newState = messagesReducer(state, messageActions.deleteMessages());
    expect(newState).toEqual([]);
  });

  it('deleteMessage should return correct state', () => {
    const state = [
      { id: 'msg1', from: 'user1', text: 'hello' },
      { id: 'msg2', from: 'user1', text: 'hello again' },
    ];
    const newState = messagesReducer(
      state,
      messageActions.deleteMessage('msg1'),
    );
    expect(newState).toEqual([
      { id: 'msg2', from: 'user1', text: 'hello again' },
    ]);
  });
});
