import { Column, Grid, Dropdown, SelectItem } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { type RegistrationConfig } from '../../../config-schema';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';

export function OtherInfo() {
  const config = useConfig<RegistrationConfig>();

  const otherInputFields = [
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
    <PersonAttributeField
      fieldDefinition={{
        id: 'bloodGroup',
        type: 'person attribute',
        uuid: config.fieldConfigurations.bloodGroup.personAttributeUuid,
        showHeading: false,
        answerConceptSetUuid: '4c2a94c6-5a14-485e-b0f5-01921750b9b6',
        label: 'Blood Group',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'religion',
        type: 'person attribute',
        uuid: config.fieldConfigurations.religion.personAttributeUuid,
        showHeading: false,
        answerConceptSetUuid: '43eee45a-082e-4216-8107-9f9e1977330b',
        label: 'Religion',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'birthPlace',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthPlace.personAttributeUuid,
        showHeading: false,
        label: `Birth Place`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'nationality',
        type: 'person attribute',
        uuid: config.fieldConfigurations.nationality.personAttributeUuid,
        showHeading: false,
        label: `Nationality`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'occupation',
        type: 'person attribute',
        uuid: config.fieldConfigurations.occupation.personAttributeUuid,
        showHeading: false,
        label: `Occupation`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'eduQualification',
        type: 'person attribute',
        uuid: config.fieldConfigurations.eduQualification.personAttributeUuid,
        showHeading: false,
        label: `Educational Qualification`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        hide:true,
        id: 'spouseNameBangla',
        type: 'person attribute',
        uuid: config.fieldConfigurations.spouseNameBangla.personAttributeUuid,
        showHeading: false,
        label: `Spouse's Name in Bangla`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'spouseNameEnglish',
        type: 'person attribute',
        uuid: config.fieldConfigurations.spouseNameEnglish.personAttributeUuid,
        showHeading: false,
        label: `Spouse's Name`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'disabilityType',
        type: 'person attribute',
        uuid: config.fieldConfigurations.disabilityType.personAttributeUuid,
        showHeading: false,
        label: `Disability Type`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'ethnicity',
        type: 'person attribute',
        uuid: config.fieldConfigurations.ethnicity.personAttributeUuid,
        showHeading: false,
        label: `Ethnicity`,
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
