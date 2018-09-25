import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'semantic-ui-react';

const ClearIcon = ({ handleClear }) => (
  <Icon name="x" onClick={handleClear} link />
);

ClearIcon.propTypes = {
  handleClear: PropTypes.func.isRequired,
};

const ProductSearch = ({ handleChange, name, value }) => {
  const clearIcon = (
    <ClearIcon
      handleClear={(e) => {
        e.target.name = name;
        e.target.value = '';
        handleChange(e);
      }}
    />
  );
  return (
    <div>
      <Input
        placeholder="Search..."
        value={value}
        name={name}
        icon={value.length > 1 ? clearIcon : 'search'}
        onChange={handleChange}
      />
    </div>
  );
};

ProductSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ProductSearch;
