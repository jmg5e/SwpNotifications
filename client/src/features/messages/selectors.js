import * as R from 'ramda';
import { createSelector } from 'reselect';

export const selectMessages = R.path(['messages']);
export const selectRecievedMessages = R.path(['messages']);
export const selectSentMessages = R.path(['messages']);

export default {
  getAll: createSelector(
    [selectMessages],
    messages => messages,
  ),
  getRecieved: createSelector(
    [selectRecievedMessages],
    messages => messages,
  ),
  getSent: createSelector(
    [selectSentMessages],
    messages => messages,
  ),
};
