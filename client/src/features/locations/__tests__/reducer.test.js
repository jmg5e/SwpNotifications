import locationsReducer, { initialState } from 'features/locations/reducer';
import Types from 'features/locations/types';

describe('Locations Reducer', () => {
  it('should have correct initial state', () => {
    expect(locationsReducer(undefined, {})).toEqual(initialState);
  });

  it('GET_LOCATIONS_SUCCESS should return correct state', () => {
    const newState = locationsReducer(undefined, {
      type: Types.GET_LOCATIONS_SUCCESS,
      locations: [
        {
          id: 1,
          moniker: '800',
          floor: '1st',
        },
        {
          id: 2,
          moniker: '600',
          floor: '2nd',
        },
      ],
    });
    expect(newState).toEqual({
      1: { id: 1, moniker: '800', floor: '1st' },
      2: { id: 2, moniker: '600', floor: '2nd' },
    });
  });

  it('CREATE_LOCATION_SUCCESS should return correct state', () => {
    const newState = locationsReducer(
      {
        1: { id: 1, moniker: '800', floor: '1st' },
      },
      {
        type: Types.CREATE_LOCATION_SUCCESS,
        location: {
          id: 2,
          moniker: '600',
          floor: '2nd',
        },
      },
    );
    expect(newState).toEqual({
      1: { id: 1, moniker: '800', floor: '1st' },
      2: { id: 2, moniker: '600', floor: '2nd' },
    });
  });

  it('UPDATE_LOCATION_SUCCESS should return correct state', () => {
    const newState = locationsReducer(
      {
        1: { id: 1, moniker: '800', floor: '1st' },
        2: { id: 2, moniker: '600', floor: '2nd' },
      },
      {
        type: Types.UPDATE_LOCATION_SUCCESS,
        location: { id: 2, moniker: 'new moniker', floor: '3rd' },
      },
    );
    expect(newState).toEqual({
      1: { id: 1, moniker: '800', floor: '1st' },
      2: { id: 2, moniker: 'new moniker', floor: '3rd' },
    });
  });

  it('DELETE_LOCATION_SUCCESS should return correct state', () => {
    const newState = locationsReducer(
      {
        1: { id: 1, moniker: '800', floor: '1st' },
        2: { id: 2, moniker: '600', floor: '2nd' },
      },
      {
        type: Types.DELETE_LOCATION_SUCCESS,
        id: 2,
      },
    );
    expect(newState).toEqual({
      1: { id: 1, moniker: '800', floor: '1st' },
    });
  });
});
