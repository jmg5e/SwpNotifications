import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import * as Page from 'components/Page';
import DataTable from 'components/DataTable';
import IfAuthenticated from 'auth/IfAuthenticated';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const LocationsPage = props => (
  <Page.Layout>
    <Page.Header>Locations</Page.Header>
    <Page.TopBar>
      <Button icon="refresh" content="Refresh" onClick={props.getLocations} />
      <IfAuthenticated>
        <Button content="New Location" icon="add" onClick={props.goToNewLocation} />
      </IfAuthenticated>
    </Page.TopBar>
    <Page.Main>
      <DataTable
        data={props.locations}
        renderRow={({ item }) => (
          <TableRow location={item} edit={() => props.goToLocation(item)} />
        )}
        renderHeader={headerProps => <TableHeader {...headerProps} />}
      />
    </Page.Main>
  </Page.Layout>
);

LocationsPage.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      moniker: PropTypes.string.isRequired,
      floor: PropTypes.string,
    }),
  ).isRequired,
  getLocations: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  goToLocation: PropTypes.func.isRequired,
  goToNewLocation: PropTypes.func.isRequired,
};

export default LocationsPage;
