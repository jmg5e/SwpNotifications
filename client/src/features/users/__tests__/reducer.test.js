import usersReducer from 'features/users/reducer';
import Types from 'features/users/types';

describe('Users Reducer', () => {
  it('should have correct initial state', () => {
    expect(usersReducer(undefined, {})).toEqual({});
  });

  it('GET_USERS_SUCCESS should return correct state', () => {
    const newState = usersReducer(undefined, {
      type: Types.GET_USERS_SUCCESS,
      users: [
        {
          id: 1,
          userName: 'user1',
          email: 'user1@email.com',
        },
        {
          id: 2,
          userName: 'user2',
          email: 'user2@email.com',
        },
      ],
    });
    expect(newState).toEqual({
      1: {
        id: 1,
        userName: 'user1',
        email: 'user1@email.com',
      },
      2: {
        id: 2,
        userName: 'user2',
        email: 'user2@email.com',
      },
    });
  });

  it('CREATE_USER_SUCCESS should return correct state', () => {
    const newState = usersReducer(
      {
        1: {
          id: 1,
          userName: 'user1',
          email: 'user1@email.com',
        },
      },
      {
        type: Types.CREATE_USER_SUCCESS,
        user: {
          id: 3,
          userName: 'user3',
          email: 'user3@email.com',
        },
      },
    );
    expect(newState).toEqual({
      1: {
        id: 1,
        userName: 'user1',
        email: 'user1@email.com',
      },
      3: {
        id: 3,
        userName: 'user3',
        email: 'user3@email.com',
      },
    });
  });

  it('delete user should return correct state', () => {
    const newState = usersReducer(
      {
        1: {
          id: 1,
          userName: 'user1',
          email: 'user1@email.com',
        },
        3: {
          id: 3,
          userName: 'user3',
          email: 'user3@email.com',
        },
      },
      {
        type: Types.DELETE_USER_SUCCESS,
        id: 1,
      },
    );
    expect(newState).toEqual({
      3: {
        id: 3,
        userName: 'user3',
        email: 'user3@email.com',
      },
    });
  });

  it('update user should return correct state', () => {
    const newState = usersReducer(
      {
        1: {
          id: 1,
          userName: 'user1',
          email: 'user1@email.com',
        },
      },
      {
        type: Types.UPDATE_USER_SUCCESS,
        user: {
          id: 1,
          userName: 'user1',
          email: 'newEmailUser1@email.com',
        },
      },
    );

    expect(newState).toEqual({
      1: {
        id: 1,
        userName: 'user1',
        email: 'newEmailUser1@email.com',
      },
    });
  });

  it('update user should NOT store password in store', () => {
    const newState = usersReducer(
      {
        1: {
          id: 1,
          userName: 'user1',
          email: 'user1@email.com',
        },
      },
      {
        type: Types.UPDATE_USER_SUCCESS,
        user: {
          id: 1,
          userName: 'user1',
          email: 'newEmailUser1@email.com',
          password: 'secret',
        },
      },
    );

    expect(newState).toEqual({
      1: {
        id: 1,
        userName: 'user1',
        email: 'newEmailUser1@email.com',
      },
    });
  });
});
