import { createSelector } from 'reselect';
import * as R from 'ramda';

// const getIdFromPath = (state, props) => Number(props.match.params.id);

export const selectConnectionId = R.path(['connection', 'connectionId']);
export const selectClients = R.prop('clients');

const hasId = clientId => c => c.id !== clientId;
const hasGroup = groupName => c => c.groups.includes(groupName);

export default {
  getAll: createSelector([selectClients], R.values),
  getCurrentClient: createSelector(
    [selectClients, selectConnectionId],
    (clients, connectionId) => R.pipe(
      R.values,
      R.find(c => c.id === connectionId),
    )(clients),
  ),
  getOtherClients: createSelector(
    [selectClients, selectConnectionId],
    (clients, connectionId) => R.pipe(
      R.values,
      R.filter(hasId(connectionId)),
    )(clients),
  ),
  getClientById: id => state => R.path(['clients', id], state),
  getFirstShiftClients: createSelector([selectClients],
    clients => R.pipe(
      R.values,
      R.filter(hasGroup('FirstShift')),
    )(clients)),
};
