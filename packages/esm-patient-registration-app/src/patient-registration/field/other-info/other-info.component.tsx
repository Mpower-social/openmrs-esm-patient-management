import { Column, Grid } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { useFormikContext } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { type RegistrationConfig } from '../../../config-schema';
import { AddressLocationsAttributeField } from '../address-locations-attributes/address-locations-attribute-field.component';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';

export function OtherInfo() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext();

  const otherInputFields = [
    <PersonAttributeField
      fieldDefinition={{
        id: 'birthPlace',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthPlace.personAttributeUuid,
        showHeading: false,
        label: t('birthPlace', 'Birth Place'),
      }}
    />,
    // <PersonAttributeField
    //   fieldDefinition={{
    //     id: 'nationality',
    //     type: 'person attribute',
    //     uuid: config.fieldConfigurations.nationality.personAttributeUuid,
    //     showHeading: false,
    //     label: t('nationality', 'Nationality'),
    //   }}
    // />,

    <AddressLocationsAttributeField
      fieldDefinition={{
        id: 'occupation',
        type: 'person attribute',
        uuid: config.fieldConfigurations.occupation.personAttributeUuid,
        showHeading: false,
        label: t('occupation', 'Occupation'),
        ...config.fieldConfigurations.occupation,
        customConceptAnswers: [
          'Professional technical professionals',
          'Semi-skilled labor service',
          'Unskilled labor',
          'Factory worker, blue collar service',
          'Home based manufacturing',
          'Business',
          'Domestic Servant',
          'Student',
          'Housewife',
          'Others Occupation',
        ].map((item) => ({
          uuid: item,
          label: item,
        })),
      }}
    />,

    <AddressLocationsAttributeField
      fieldDefinition={{
        id: 'eduQualification',
        type: 'person attribute',
        uuid: config.fieldConfigurations.eduQualification.personAttributeUuid,
        showHeading: false,
        label: t('eduQualification', 'Educational Qualification'),
        ...config.fieldConfigurations.eduQualification,
        customConceptAnswers: [
          { uuid: 'illiterate', label: 'Illiterate' },
          { uuid: 'class_1', label: 'First Grade' },
          { uuid: 'class_2', label: 'Second Grade' },
          { uuid: 'class_3', label: 'Third Grade' },
          { uuid: 'class_4', label: 'Fourth Grade' },
          { uuid: 'class_5', label: 'Fifth Grade' },
          { uuid: 'class_6', label: 'Sixth Grade' },
          { uuid: 'class_7', label: 'Seventh Grade' },
          { uuid: 'class_8', label: 'Eighth Grade' },
          { uuid: 'class_9', label: 'Ninth Grade' },
          { uuid: 'class_10', label: 'Tenth Grade' },
          { uuid: 'ssc_pass', label: 'SSC Pass' },
          { uuid: 'hsc_pass', label: 'HSC Pass' },
          { uuid: 'graduate', label: 'Bachelor' },
          { uuid: 'masters', label: 'Masters' },
          { uuid: 'doctor', label: 'Doctor' },
          { uuid: 'engineer', label: 'Engineer' },
          { uuid: 'vocational_education', label: 'Vocational Education' },
          { uuid: 'technical_education', label: 'Technical Education' },
          { uuid: 'midwifery_nursing', label: 'Midwifery / Nursing' },
          { uuid: 'pre_primary_school', label: 'Pre-primary School' },
          {
            uuid: 'did_not_attend_in_school_but_can_read_and_write',
            label: 'Did not attend school but can read and write',
          },
          {
            uuid: 'did_not_attend_in_school_but_can_read',
            label: 'Did not attend school but can read',
          },
          { uuid: 'others_specify', label: 'Others (Specify)' },
        ].map((i) => ({ uuid: i.label, label: i.label })),
      }}
    />,

    <AddressLocationsAttributeField
      fieldDefinition={{
        id: 'disabilityType',
        type: 'person attribute',
        uuid: config.fieldConfigurations.disabilityType.personAttributeUuid,
        showHeading: false,
        label: t('disabilityType', 'Disability Type'),
        ...config.fieldConfigurations.disabilityType,
        customConceptAnswers: [
          { uuid: 'autism', label: 'Person with autism traits' },
          { uuid: 'physical_disability', label: 'Physical disability' },
          {
            uuid: 'auditory_disability',
            label: 'Visual and hearing disability',
          },
          {
            uuid: 'mute_and_hearing_disability',
            label: 'Speech and hearing disability',
          },
          { uuid: 'mental_disability', label: 'Mental disability' },
          { uuid: 'mentally_challenged', label: 'Intellectual disability' },
          {
            uuid: 'cerebral_palsy',
            label: 'Cerebral palsy-related disability',
          },
          { uuid: 'down_syndrome', label: 'Down syndrome-related disability' },
          {
            uuid: 'multidimensional_disability',
            label: 'Multiple disabilities',
          },
        ].map((i) => ({ uuid: i.label, label: i.label })),
      }}
    />,
    <AddressLocationsAttributeField
      fieldDefinition={{
        id: 'disabilityType',
        type: 'person attribute',
        uuid: config.fieldConfigurations.ethnicity.personAttributeUuid,
        showHeading: false,
        label: t('ethnicity', 'Ethnicity'),
        ...config.fieldConfigurations.ethnicity,
        customConceptAnswers: [
          'Bengali',
          'Chakma',
          'Marma',
          'Tripura',
          'Santal',
          'Garo',
          'Manipuri',
          'Onrao',
          'Tanchanga',
          'Barman',
          'Khasia',
          'Mro',
          'Munda',
          'Others (Ethnicity)',
        ].map((item) => ({ uuid: item, label: item })),
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
