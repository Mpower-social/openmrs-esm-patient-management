import { Column, Grid, Dropdown, SelectItem } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { type RegistrationConfig } from '../../../config-schema';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useTranslation } from 'react-i18next';
import { SelectInput } from '../../input/basic-input/select/select-input.component';

export function OtherInfo() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();

  const otherInputFields = [
    <SelectInput
      name="gender"
      options={[
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' },
        { value: 'other', text: 'Other' },
        { value: 'unknown', text: 'Unknown' },
      ]}
      label="Gender"
      required={true}
    />,
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
        id: 'bloodGroup',
        type: 'person attribute',
        uuid: config.fieldConfigurations.bloodGroup.personAttributeUuid,
        showHeading: false,
        answerConceptSetUuid: '4c2a94c6-5a14-485e-b0f5-01921750b9b6',
        label: t('bloodGroup', 'Blood Group'),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'birthPlace',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthPlace.personAttributeUuid,
        showHeading: false,
        label: t('birthPlace', 'Birth Place'),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'nationality',
        type: 'person attribute',
        uuid: config.fieldConfigurations.nationality.personAttributeUuid,
        showHeading: false,
        label: t('nationality', 'Nationality'),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'occupation',
        type: 'person attribute',
        uuid: config.fieldConfigurations.occupation.personAttributeUuid,
        showHeading: false,
        label: t('occupation', 'Occupation'),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'eduQualification',
        type: 'person attribute',
        uuid: config.fieldConfigurations.eduQualification.personAttributeUuid,
        showHeading: false,
        label: t('eduQualification', 'Educational Qualification'),
      }}
    />,

    <PersonAttributeField
      fieldDefinition={{
        id: 'disabilityType',
        type: 'person attribute',
        uuid: config.fieldConfigurations.disabilityType.personAttributeUuid,
        showHeading: false,
        label: t('disabilityType', 'Disability Type'),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'ethnicity',
        type: 'person attribute',
        uuid: config.fieldConfigurations.ethnicity.personAttributeUuid,
        showHeading: false,
        label: t('ethnicity', 'Ethnicity'),
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
