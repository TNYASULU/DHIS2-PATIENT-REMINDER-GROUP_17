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
    return (
        <select name="organizationUnit" value={value} onChange={onChange} required>
          <option value="">Select unit</option>
          {data.orgUnits.organisationUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.displayName}
            </option>
          ))}
        </select>
      );
    };
    
    export default OrganizationUnitDropdown;