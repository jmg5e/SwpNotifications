import { createSelector } from 'reselect';
import * as R from 'ramda';

export const selectCurrentClientConnectionId = R.path(['connection', 'client', 'id']);
export const selectClients = R.prop('clients');

const hasId = clientId => client => client.id !== clientId;
const hasGroup = groupName => client => client.groups.includes(groupName);

export default {
  getAll: createSelector([selectClients], R.values),
  getCurrentClient: R.path(['connection', 'client']),
  getOtherClients: createSelector(
    [selectClients, selectCurrentClientConnectionId],
    (clients, connectionId) => R.pipe(
      R.values,
      R.filter(hasId(connectionId)),
    )(clients),
  ),
  getClientById: id => state => R.path(['clients', id], state),
  getFirstShiftClients: createSelector([selectClients], clients => R.pipe(
    R.values,
    R.filter(hasGroup('FirstShift')),
  )(clients)),
};
