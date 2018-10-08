import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const IfAuthenticated = ({
  authenticated,
  children,
  renderElse,
  user,
  requireAdmin,
  requiredGroup,
}) => {
  if (!authenticated || !user) {
    return renderElse ? renderElse() : null;
  }
  if (requireAdmin && !user.isAdmin) {
    return renderElse ? renderElse() : null;
  }

  if (requiredGroup && !user.hubGroups.includes(requiredGroup)) {
    return renderElse ? renderElse() : null;
  }

  return (<React.Fragment>{children}</React.Fragment>);
};

IfAuthenticated.defaultProps = {
  renderElse: null,
  requireAdmin: false,
  requiredGroup: null,
  user: null,
  children: null,
};

IfAuthenticated.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    isAdmin: PropTypes.bool,
    hubGroups: PropTypes.arrayOf(PropTypes.string),
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  requireAdmin: PropTypes.bool,
  requiredGroup: PropTypes.string,
  renderElse: PropTypes.func,
};

export default connect(state => ({ ...state.auth }))(IfAuthenticated);
