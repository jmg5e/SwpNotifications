// import { EventEmitter } from 'events';

// export class MockedHubConnectionWithEvents extends EventEmitter {
//   onclose = fn => this.on('onclose', fn);
//
//   start = jest.fn(() => Promise.resolve('mocked HubConnection.start'));
//
//   stop = jest.fn(() => Promise.resolve());
//
//   on = jest.fn().mockReturnThis(this.on);
// }
/*
   HubConnectionBuilder is used in middleware
   but can import MockedHubConnectionBuilder, MockedHubConnection in tests
   to change mocked values
*/
export const MockedHubConnection = {
  start: jest.fn(() => Promise.resolve('mocked HubConnection.start')),
  stop: jest.fn(() => Promise.resolve()),
  onclose: jest.fn(),
  on: jest.fn(),
};

export const LogLevel = [
  'Trace',
  'Debug',
  'Information',
  'Warning',
  'Error',
  'Critical',
  'None',
];

export const MockedHubConnectionBuilder = {
  withUrl: jest.fn().mockReturnThis(),
  configureLogging: jest.fn().mockReturnThis(),
  build: jest.fn().mockReturnValue(MockedHubConnection),
};

export const HubConnectionBuilder = jest
  .fn()
  .mockImplementation(() => MockedHubConnectionBuilder);
