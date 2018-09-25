import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DefaultRenderRow = ({ item, columns, index }) => (
  <Table.Row key={`tr-${index}`}>
    {columns.map(col => (
      <Table.Cell key={`tc-${col}-${index}`}>{item[col]}</Table.Cell>
    ))}
  </Table.Row>
);

DefaultRenderRow.propTypes = {
  // eslint-disable-next-line
  item: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default DefaultRenderRow;
