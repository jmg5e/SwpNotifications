import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default WrappedComponent => class ModalHoc extends React.Component {
    static propTypes = {
      triggerProps: PropTypes.shape({}),
    };

    static defaultProps = {
      triggerProps: { content: 'open' },
    };

    state = {
      open: false,
    };

    openModal = () => this.setState({ open: true });

    closeModal = () => this.setState({ open: false });

    render() {
      return (
        <Modal
          open={this.state.open}
          trigger={
            <Button onClick={this.openModal} {...this.props.triggerProps} />
          }
        >
          <WrappedComponent {...this.props} closeModal={this.closeModal} />;
        </Modal>
      );
    }
};
