import { messageRecieved } from '../features/messages/actions';
import { signalrError } from './actions';

export default {
  Error: signalrError,
  MessageRecieved: messageRecieved,
};
