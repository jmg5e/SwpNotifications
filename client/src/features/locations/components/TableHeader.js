import React from 'react';
import { Table } from 'semantic-ui-react';
import IfAuthenticated from 'auth/IfAuthenticated';
import PropTypes from 'prop-types';

const TableHeader = ({ sortedColumn, sortDirection, sortColumn }) => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell
        onClick={() => sortColumn('moniker')}
        sorted={sortedColumn === 'moniker' ? sortDirection : null}
      >
        Name
      </Table.HeaderCell>
      <Table.HeaderCell
        onClick={() => sortColumn('floor')}
        sorted={sortedColumn === 'floor' ? sortDirection : null}
      >
        Floor
      </Table.HeaderCell>
      <IfAuthenticated>
        <Table.HeaderCell colSpan={2} />
      </IfAuthenticated>
    </Table.Row>
  </Table.Header>
);

TableHeader.propTypes = {
  sortedColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  sortColumn: PropTypes.func.isRequired,
};
export default TableHeader;
