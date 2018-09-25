import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import IfAuthenticated from 'auth/IfAuthenticated';

const TableRow = ({ location, edit }) => (
  <Table.Row key={`tr-${location.moniker}`}>
    <Table.Cell>{location.moniker}</Table.Cell>
    <Table.Cell>{location.floor}</Table.Cell>
    <IfAuthenticated>
      <Table.Cell
        style={{ textAlign: 'center', verticalAlign: 'center' }}
        content={<Label as="a" icon="edit" content="edit" size="small" onClick={edit} />}
      />

      <Table.Cell
        style={{ textAlign: 'center', verticalAlign: 'center' }}
        content={<Label as="a" icon="trash" content="delete" color="red" size="small" />}
      />
    </IfAuthenticated>
  </Table.Row>
);

TableRow.propTypes = {
  location: PropTypes.shape({
    moniker: PropTypes.string,
    floor: PropTypes.string,
  }).isRequired,
  edit: PropTypes.func.isRequired,
};

export default TableRow;
