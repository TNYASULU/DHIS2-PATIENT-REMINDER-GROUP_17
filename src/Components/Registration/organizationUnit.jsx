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