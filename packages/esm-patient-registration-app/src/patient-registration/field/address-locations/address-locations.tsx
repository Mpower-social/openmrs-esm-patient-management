import { Column, Grid } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import React, { useEffect } from 'react';

import { type RegistrationConfig } from '../../../config-schema';
import { AddressLocationsAttributeField } from '../address-locations-attributes/address-locations-attribute-field.component';
import { useFetchLocations } from '../field.resource';

export function AddressLocations() {
  const config = useConfig<RegistrationConfig>();

  const { fetchData, data: divisions, isLoading: divisionLoading } = useFetchLocations();

  useEffect(() => {
    fetchData('24525');
  }, []);

  const otherInputFields = [
    <AddressLocationsAttributeField
      fieldDefinition={{
        id: 'division',
        type: 'person attribute',
        uuid: config.fieldConfigurations.division.personAttributeUuid,
        showHeading: false,
        label: 'Division',
        customConceptAnswers: divisions,
        ...config.fieldConfigurations.division,
      }}
    />,
  ];

  return (
    <div>
      {!divisionLoading && (
        <Grid>
          {otherInputFields.map((field, index) => (
            <Column key={index} lg={4} md={4} sm={2}>
              {field}
            </Column>
          ))}
        </Grid>
      )}
    </div>
  );
}
