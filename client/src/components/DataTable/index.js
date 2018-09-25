import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import sortByField from 'utils/sort';
import DefaultRenderHeader from './RenderHeader';
import DefaultRenderRow from './RenderRow';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedColumn: '',
      sortDirection: '',
    };
    this.columns = props.columns;
  }

  sortColumn = (column) => {
    const { sortDirection } = this.state;

    this.setState({
      sortedColumn: column,
      sortDirection: sortDirection === 'ascending' ? 'descending' : 'ascending',
    });
  };

  renderHeader = () => {
    const TableHeader = this.props.renderHeader;
    return (
      <TableHeader
        sortedColumn={this.state.sortedColumn}
        sortDirection={this.state.sortDirection}
        sortColumn={this.sortColumn}
        columns={this.columns}
      />
    );
  };

  renderRow = (item, index) => {
    const TableRow = this.props.renderRow;
    return (
      <TableRow
        key={index}
        item={item}
        index={index}
        columns={this.columns}
      />
    );
  };

  render() {
    const { sortedColumn, sortDirection } = this.state;
    const data = this.props.data.sort(
      sortByField(sortedColumn, sortDirection === 'ascending'),
    );

    return (
      <Table sortable celled striped fixed>
        {this.renderHeader()}
        <Table.Body>{data.map(this.renderRow)}</Table.Body>
        {this.props.renderFooter ? this.props.renderFooter() : null }
      </Table>
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string),
  renderHeader: PropTypes.func,
  renderRow: PropTypes.func,
  renderFooter: PropTypes.func,
};

DataTable.defaultProps = {
  renderHeader: DefaultRenderHeader,
  renderRow: DefaultRenderRow,
  renderFooter: null,
  columns: [],
};

export default DataTable;
