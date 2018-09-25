import { decodeToken, isExpired } from 'utils/jwt';

describe('jwt helper', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('decode should return correct propertties', () => {
    const decodedValue = {
      sub: 'user',
      jti: '4c8c4c9f-e02b-4f9f-8315-2a4e9a1c805e',
      exp: '1512753202',
    };
    const decoder = jest.fn(() => decodedValue);
    expect(decodeToken('blahblah', decoder)).toEqual(decodedValue);
    expect(decoder).toBeCalledWith('blahblah');
  });

  it('isExpired should return true', () => {
    const tokenExpiration = 1546344000; //  jan 1, 2019  12:00
    const now = 1577880000000; // jan 1 2020 12:00
    Date.now = jest.genMockFunction().mockReturnValue(now);
    expect(isExpired(tokenExpiration)).toEqual(true);
  });

  it('isExpired should return false', () => {
    const tokenExpiration = 1609502400; //  jan 1, 2021  12:00
    const now = 1577880000000; // jan 1 2020 12:00
    Date.now = jest.genMockFunction().mockReturnValue(now);
    expect(isExpired(tokenExpiration)).toEqual(false);
  });
});
