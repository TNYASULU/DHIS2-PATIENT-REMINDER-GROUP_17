import React from 'react';
import { CircularLoader } from '@dhis2/ui';
import { useDataQuery } from '@dhis2/app-runtime';

const organizationUnitQuery = {
  orgUnits: {
    resource: 'organisationUnits',
    params: {
      fields: ['id', 'displayName'],
      paging: false,
    },
  },
};
const OrganizationUnitDropdown = ({ value, onChange }) => {
    const { loading, error, data } = useDataQuery(organizationUnitQuery);
  
    if (loading) return <CircularLoader small />;
    if (error) return <span>Error loading organization units</span>;
  