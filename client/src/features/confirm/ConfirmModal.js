import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Confirm } from 'semantic-ui-react';
import { closeConfirm } from './actions';

class ConfirmModal extends Component {
  handleConfirm = () => {
    this.props.closeConfirm();

    if (typeof this.props.confirmFn === 'function') this.props.confirmFn();
    // if (typeof this.props.confirmFn === 'object') this.props.dispatch(this.props.confirmFn());
  };

  handleCancel = () => {
    this.props.closeConfirm();
  }

  render() {
    return (
      <Confirm
        open={this.props.isOpen}
        content={this.props.message}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
      />
    );
  }
}

ConfirmModal.defaultProps = {
  confirmFn: null,
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  // confirmFn: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
  confirmFn: PropTypes.func,
  closeConfirm: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ ...state.confirm });

// const mapDispatchToProps = dispatch => ({
//   dispatch,
//   closeConfirm: bindActionCreators(dispatch, closeConfirm),
// });

const mapDispatchToProps = {
  // dispatch,
  closeConfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
