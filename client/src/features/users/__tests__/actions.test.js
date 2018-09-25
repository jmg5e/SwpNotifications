import * as actions from 'features/users/actions';

describe('Users action creators', () => {
  it('actions should return object with type', () => {
    Object.keys(actions).forEach((key) => {
      expect(typeof actions[key]).toEqual('function');
      const action = actions[key]();
      expect(action).toEqual(expect.objectContaining({
        type: expect.any(String),
      }));
    });
  });
});
