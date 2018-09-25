import React from 'react';
import { Table, Label, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import IfAuthenticated from 'auth/IfAuthenticated';

const TableRow = ({
  product, requestProduct, edit, deleteProduct,
}) => (
  <Table.Row key={`tr-${product.id}`}>
    <Table.Cell collapsing>
      <Button icon="alarm" onClick={() => requestProduct(product.id)} />
    </Table.Cell>
    <Table.Cell>{product.name}</Table.Cell>
    <Table.Cell>{product.location}</Table.Cell>
    <Table.Cell>{product.slot}</Table.Cell>

    <IfAuthenticated>
      <Table.Cell
        style={{ textAlign: 'center', verticalAlign: 'center' }}
        content={(
          <Label
            as="a"
            icon="edit"
            content="edit"
            size="small"
            onClick={edit}
          />)}
      />

      <Table.Cell
        style={{ textAlign: 'center', verticalAlign: 'center' }}
        content={(
          <Label
            as="a"
            icon="trash"
            content="delete"
            color="red"
            size="small"
            onClick={deleteProduct}
          />)}
      />
    </IfAuthenticated>
  </Table.Row>
);

TableRow.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.string,
    slot: PropTypes.string,
  }).isRequired,
  requestProduct: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default TableRow;
