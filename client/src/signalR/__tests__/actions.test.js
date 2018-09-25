import { disconnect, connectToHub } from 'signalR/actions';
import Types from 'signalR/types';

describe('SignalR Actions', () => {
  it('connectToHub', () => {
    expect(connectToHub()).toEqual(expect.objectContaining({ type: Types.SIGNALR_CONNECT }));
  });

  it('disconnect', () => {
    expect(disconnect()).toEqual(expect.objectContaining({ type: Types.SIGNALR_DISCONNECT }));
  });
});
