import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';

/* TODO fix this hacky way to handle semantic Dropdown change */
const ClearIcon = ({ handleClear }) => (
  <Icon name="x" onClick={handleClear} />
);

ClearIcon.propTypes = {
  handleClear: PropTypes.func.isRequired,
};

const LocationSelect = ({
  locations, handleChange, name, value,
}) => {
  const clearIcon = (
    <ClearIcon
      value
      handleClear={(e) => {
        e.stopPropagation();
        e.target.name = name;
        e.target.value = '';
        handleChange(e);
      }}
    />
  );
  return (
    <span>
      Location{' '}
      <Dropdown
        name={name}
        value={value}
        icon={value ? clearIcon : 'dropdown'}
        onChange={(e, data) => {
          e.target.name = name;
          e.target.value = data.value;
          handleChange(e);
        }}
        options={[...locations.map(loc => ({ value: loc, text: loc }))]}
      />
    </span>
  );
};

LocationSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

LocationSelect.defaultProps = {
  value: '',
};

export default LocationSelect;
