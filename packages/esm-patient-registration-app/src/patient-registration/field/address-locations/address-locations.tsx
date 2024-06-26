import { Column, Grid } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { type RegistrationConfig } from '../../../config-schema';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';

export function AddressLocations() {
  const config = useConfig<RegistrationConfig>();

  const otherInputFields = [
    <PersonAttributeField
      fieldDefinition={{
        id: 'mobileNo',
        type: 'person attribute',
        uuid: config.fieldConfigurations.phone.personAttributeUuid,
        showHeading: false,
        label: 'Mobile No',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'maritalStatus',
        type: 'person attribute',
        uuid: config.fieldConfigurations.maritalStatus.personAttributeUuid,
        showHeading: false,
        answerConceptSetUuid: 'c955a699-5f57-4a92-a7e4-30c6215430e9',
        label: 'Marital Status',
      }}
    />,
  ];

  return (
    <div>
      <Grid>
        {otherInputFields.map((field, index) => (
          <Column key={index} lg={4} md={4} sm={2}>
            {field}
          </Column>
        ))}
      </Grid>
    </div>
  );
}
