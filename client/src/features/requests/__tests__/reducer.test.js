import requestsReducer from 'features/requests/reducer';
import * as actions from 'features/requests/actions';

describe('Redux Store Requests', () => {
  it('requestRecieved should return correct state', () => {
    const state = {
      active: { 1: { id: 1, productId: 15 } },
      history: {},
    };
    const newState = requestsReducer(
      state,
      actions.requestRecieved({
        id: 1,
        productId: 11,
      }),
    );
    expect(newState.active).toEqual({ 1: { id: 1, productId: 11 } });
  });

  it('requestsLoaded should return correct state', () => {
    const requests = [{ id: 1, productId: 3 }, { id: 2, productId: 4 }];
    const newState = requestsReducer(
      {
        active: {},
        dismissed: { 3: { id: 3, productId: 2 } },
      },
      actions.requestsLoaded(requests),
    );
    expect(newState.active).toEqual({
      1: { id: 1, productId: 3 },
      2: { id: 2, productId: 4 },
    });
    expect(newState.dismissed[3]).toEqual(expect.any(Object));
  });

  // it('requestDissmissed should return correct state', () => {
  //   const state = {
  //     active: { 2: { id: 2, productId: 15 } },
  //     history: {},
  //   };
  //   const newState = requestsReducer(
  //     state,
  //     actions.requestDismissed({ id: 2, productId: 15 }, 'user', 'eventId1'),
  //   );
  //
  //   expect(newState.history.eventId1).toEqual({
  //     ids: [2],
  //     products: [15],
  //     user: 'user',
  //     eventId: 'eventId1',
  //   });
  //   expect(newState.active[2]).toEqual();
  // });

  it('requestsDissmissed should return correct state', () => {
    const state = {
      active: {
        1: { id: 1, productId: 11 },
        2: { id: 2, productId: 12 },
        3: { id: 3, productId: 13 },
      },
      history: {},
    };
    const newState = requestsReducer(
      state,
      actions.requestsDismissed({
        eventId: 'eventId1',
        clientIdentifier: 'user',
        requests: [{ id: 1, productId: 11 }, { id: 2, productId: 12 }],
      }),
    );
    // expect(newState.history).toEqual();
    expect(newState.history).toEqual({
      eventId1: {
        clientIdentifier: 'user',
        eventId: 'eventId1',
        requests: [{ id: 1, productId: 11 }, { id: 2, productId: 12 }],
      },
    });

    expect(newState.active).toEqual({
      3: { id: 3, productId: 13 },
    });
  });

  it('clearHistory should return correct state', () => {
    const state = {
      active: {
        3: { id: 3, productId: 13 },
      },
      history: { adafs: { ids: [1, 2], products: [11, 12] } },
    };
    const newState = requestsReducer(state, actions.clearHistory());
    expect(newState.history).toEqual({});
    expect(newState.active).toEqual(state.active);
  });
});
