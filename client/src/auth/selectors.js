import * as R from 'ramda';
import { createSelector } from 'reselect';

export const selectAuth = R.prop('auth');

export default {
  getUser: createSelector([selectAuth], R.prop('user')),
  getLoggedInUser: createSelector([selectAuth], R.path(['user', 'userName'])),
  getAccessToken: createSelector(
    [selectAuth], R.path(['user', 'accessToken']),
  ),
  getRefreshToken: createSelector(
    [selectAuth], R.path(['user', 'refreshToken']),
  ),
};
