import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DefaultRenderHeader = ({
  columns,
  sortedColumn,
  sortDirection,
  sortColumn,
}) => (
  <Table.Header>
    <Table.Row>
      {columns.map(column => (
        <Table.HeaderCell
          key={column}
          sorted={sortedColumn === column ? sortDirection : null}
          onClick={() => sortColumn(column)}
        >
          {column}
        </Table.HeaderCell>
      ))}
    </Table.Row>
  </Table.Header>
);

DefaultRenderHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortedColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  sortColumn: PropTypes.func.isRequired,
};

export default DefaultRenderHeader;
