import eventHandler from 'signalR/eventHandler';
import { EventEmitter } from 'events';
import EventActions from 'signalR/eventActions';

jest.mock('signalR/eventActions', () => ({
  onMessage: jest.fn(),
  onAdd: jest.fn(),
}));

class MockedHubWithEvents extends EventEmitter {
  onclose = fn => this.on('onclose', fn);
}

describe('Hub Event Handler', () => {
  it('should listen for events', async () => {
    const hub = {
      on: jest.fn(),
      onclose: jest.fn(),
    };
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
    };
    eventHandler(hub, store);

    expect(hub.on).toBeCalledWith('onMessage', expect.any(Function));
  });

  it('should dispatch correct action on Event', async () => {
    const hub = new MockedHubWithEvents();

    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
    };

    eventHandler(hub, store);
    hub.emit('onMessage', 'some message');

    expect(store.dispatch).toBeCalled();
    expect(EventActions.onMessage).toBeCalledWith('some message');
  });
});
