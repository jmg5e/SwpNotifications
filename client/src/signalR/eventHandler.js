import { bindActionCreators } from 'redux';
import { disconnected } from 'features/connection/actions';
import EventActions from './eventActions';

/* register events with hub */
export default (hub, store) => {
  const { dispatch } = store;

  const hubActions = bindActionCreators(EventActions, dispatch);

  Object.keys(hubActions).forEach((event) => {
    hub.on(event, hubActions[event]);
  });

  /* TODO include this in event actions(bind onclose to on?) */
  hub.onclose(() => dispatch(disconnected()));
};

/* event -> transformation? -> action  */
// const applyTransformations = (actions, getState) => Object.keys(EventTransformations).reduce(
//   (accum, event) => ({
//     ...accum,
//     [event]: EventTransformations[event](getState, accum[event]),
//   }),
//   actions,
// );
