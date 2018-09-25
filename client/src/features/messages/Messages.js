import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import {
//   Header, Divider, Segment, Feed, Icon,
// } from 'semantic-ui-react';
import MessageList from './components/MessageList';
// import selector from 'selectors/messages';

const Messages = props => (
  <MessageList
    {...props}
    deleteAll={() => props.dispatch({
      type: 'MESSAGES_DELETED',
    })
    }
    deleteMessage={id => props.dispatch({
      type: 'MESSAGE_DELETED',
      id,
    })
    }
  />
);
// const Messages = props => (
//   <div>
//     <Header as="h1">Messages</Header>
//     <Divider />
//     <Segment.Group>
//       <Segment>
//         <input
//           type="button"
//           value="Delete All"
//           onClick={() => props.dispatch({
//             type: 'MESSAGES_DELETED',
//           })
//               }
//         />
//       </Segment>
//       <Segment>
//         <Feed>
//           {props.messages.map(msg => (
//             <Feed.Event key={msg.id}>
//               <Feed.Label>
//                 <Icon name="mail" />
//               </Feed.Label>
//               <Feed.Content>
//                 <Feed.Summary>
//                   <Feed.User>
//                     {msg.userName || msg.sentBy}
//                   </Feed.User>
//                   <Feed.Date>{new Date(msg.timeStamp).toLocaleTimeString()}</Feed.Date>
//                 </Feed.Summary>
//                 <Feed.Extra text>
//                   {msg.text}
//                 </Feed.Extra>
//                 <Feed.Meta>
//                   {#<{(| <span> |)}>#}
//                   {#<{(|   <Icon name="reply" /> |)}>#}
//                   {#<{(|   Reply |)}>#}
//                   {#<{(| </span> |)}>#}
//                   <span>
//                     <Icon name="trash" />
//                         Delete
//                   </span>
//                 </Feed.Meta>
//               </Feed.Content>
//             </Feed.Event>
//           ))}
//         </Feed>
//       </Segment>
//     </Segment.Group>
//   </div>
// );

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  messages: state.messages,
  // messages: selector.getRecievedMessages(state),
  // clients: selector.getOtherClients(state),
});
// const mapDispatchToProps = dispatch => ({
//   sendMessage: bindActionCreators(sendMessage, dispatch),
//   joinGroup: bindActionCreators(joinGroup, dispatch),
//   sendGroupMessage: bindActionCreators(sendGroupMessage, dispatch),
//   broadcastMessage: bindActionCreators(broadcastMessage, dispatch),
//   getConnectedClients: bindActionCreators(getConnectedClients, dispatch),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Messages);
