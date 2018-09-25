import { validateApiAction, validateSignalrAction } from 'utils/validateActions';

describe('validate Api Action', () => {
  it('should NOT throw error on valid action', () => {
    expect(() => validateApiAction({
      label: 'valid action',
      endPoint: '/api/test',
      success: jest.fn(),
      failed: jest.fn(),
    })).not.toThrow();
  });

  it('should throw error when missing endPoint', () => {
    expect(() => validateApiAction({
      label: 'invalid action',
      success: jest.fn(),
    })).toThrow();
  });

  it('should throw error when success is not a function', () => {
    expect(() => validateApiAction({
      label: 'invalid action',
      endPoint: '/api/test',
      success: {},
    })).toThrow();
  });

  it('should throw error when failed is not a function', () => {
    expect(() => validateApiAction({
      label: 'invalid action',
      endPoint: '/api/test',
      failed: 3,
    })).toThrow();
  });

  it('should throw error when endPoint is not a string', () => {
    expect(() => validateApiAction({
      label: 'invalid api action',
      endPoint: 32,
    })).toThrow();
  });
});

describe('validate Signalr Actions', () => {
  it('should NOT throw error on valid action', () => {
    expect(() => validateSignalrAction({
      label: 'valid action',
      method: 'SendMessage',
      success: jest.fn(),
      failed: jest.fn(),
      payload: 'Hello World!',
    })).not.toThrow();
  });
  it('should throw error when missing method', () => {
    expect(() => validateSignalrAction({
      label: 'invalid action',
      success: jest.fn(),
    })).toThrow();
  });

  it('should throw error when invalid types are given', () => {
    expect(() => validateSignalrAction({
      label: 'invalid action',
      method: 32,
      success: jest.fn(),
    })).toThrow();

    expect(() => validateSignalrAction({
      label: 'invalid action',
      method: 'test',
      success: 'blah',
    })).toThrow();
    expect(() => validateSignalrAction({
      label: 'invalid action',
      method: 'test',
      success: jest.fn(),
      failed: {},
    })).toThrow();
  });
});
