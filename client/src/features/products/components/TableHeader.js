import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import IfAuthenticated from 'auth/IfAuthenticated';

const ProductTableHeader = ({ sortedColumn, sortDirection, sortColumn }) => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell />
      <Table.HeaderCell
        width={6}
        onClick={() => sortColumn('name')}
        sorted={sortedColumn === 'name' ? sortDirection : null}
      >
        Name
      </Table.HeaderCell>
      <Table.HeaderCell
        width={3}
        onClick={() => sortColumn('location')}
        sorted={sortedColumn === 'location' ? sortDirection : null}
      >
        Location
      </Table.HeaderCell>
      <Table.HeaderCell
        width={3}
        onClick={() => sortColumn('slot')}
        sorted={sortedColumn === 'slot' ? sortDirection : null}
      >
        Slot
      </Table.HeaderCell>
      <IfAuthenticated>
        <Table.HeaderCell colSpan={2} />
      </IfAuthenticated>
    </Table.Row>
  </Table.Header>
);

ProductTableHeader.propTypes = {
  sortedColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  sortColumn: PropTypes.func.isRequired,
};
export default ProductTableHeader;
