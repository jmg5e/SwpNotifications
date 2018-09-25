import * as validations from 'utils/validations';

describe('validations', () => {
  it('isRequired should return error', () => {
    expect(validations.isRequired(null)).toEqual('Required.');
    expect(validations.isRequired(undefined)).toEqual('Required.');
    expect(validations.isRequired(' ')).toEqual('Required.');
    expect(validations.isRequired([])).toEqual('Required.');
  });

  it('isRequired should NOT return error', () => {
    expect(validations.isRequired('blah')).toEqual(null);
    expect(validations.isRequired(' b ')).toEqual(null);
    expect(validations.isRequired(3)).toEqual(null);
    expect(validations.isRequired([1])).toEqual(null);
  });

  // it('isValidIp should NOT return error', () => {
  //   expect(validations.isValidIp('127.0.0.1')).toEqual(null);
  //   expect(validations.isValidIp('192.168.0.100')).toEqual(null);
  // });
  //
  // it('isValidIp should return error', () => {
  //   expect(validations.isValidIp('foobar')).toEqual('Invalid Ip.');
  //   expect(validations.isValidIp('127.0.3.3.0.0')).toEqual('Invalid Ip.');
  //   expect(validations.isValidIp('127.0.')).toEqual('Invalid Ip.');
  // });

  it('minLength should return error', () => {
    const minLength5 = validations.minLength(5);
    expect(minLength5('foo')).toEqual('Minimum Length of 5 Required.');
  });

  it('minLength should NOT return error', () => {
    const minLength5 = validations.minLength(5);
    expect(minLength5('foobar')).toEqual(null);
  });

  it('maxLength should return error', () => {
    const maxLength5 = validations.maxLength(5);
    expect(maxLength5('foobar')).toEqual('Exceeded Character Length: 5');
  });

  it('maxLength should NOT return error', () => {
    const maxLength5 = validations.maxLength(5);
    expect(maxLength5('foo')).toEqual(null);
  });

  it('matchesPassword should return error', () => {
    expect(validations.matchesPassword('foo', { password: 'foobar' })).toEqual('Passwords do not match.');
  });

  it('matchesPassword should NOT return error', () => {
    expect(validations.matchesPassword('foobar', { password: 'foobar' })).toEqual(null);
  });
});
