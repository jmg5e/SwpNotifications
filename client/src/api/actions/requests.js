// import Types from 'api/types';
// import * as actions from 'features/requests/actions';
// import { toastrError } from 'notifications/toastr';
//
// export const getRequests = () => ({
//   type: Types.API,
//   label: 'Get api/requests',
//   endPoint: '/api/requests',
//   success: actions.requestsLoaded,
//   failed: toastrError('Failed To Load Requests'),
//   requestOptions: {
//     method: 'GET',
//   },
// });

// export const deleteRequest = requestId => ({
//   type: Types.API_AUTHENTICATED,
//   label: 'Delete api/requests',
//   endPoint: `/api/requests/${requestId}`,
//   failed: toastrError('Acknowledge Request Failed.'),
//   requestOptions: {
//     method: 'DELETE',
//   },
// });

// export const clearRequests = () => ({
//   type: Types.API_AUTHENTICATED,
//   label: 'Delete api/requests',
//   endPoint: '/api/requests',
//   failed: toastrError('Acknowledge All Requests Failed.'),
//   requestOptions: {
//     method: 'DELETE',
//   },
// });
