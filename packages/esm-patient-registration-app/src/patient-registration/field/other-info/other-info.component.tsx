import { Column, Grid } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { useField } from 'formik';
import React, { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { type RegistrationConfig } from '../../../config-schema';
import { generateFormatting } from '../../date-util';
import { PatientRegistrationContext } from '../../patient-registration-context';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';

export function OtherInfo() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();
  const { setFieldValue, values } = useContext(PatientRegistrationContext);
  const [registrationDate, registrationDateMeta] = useField('registrationDate');
  const { format, placeHolder, dateFormat } = generateFormatting(['d', 'm', 'Y'], '/');
  const onDateChange = useCallback(
    (registrationDate: Date[]) => {
      setFieldValue('registrationDate', registrationDate[0]);
    },
    [setFieldValue],
  );

  useEffect(() => {
    setFieldValue('registrationDate', new Date());
  }, []);

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
        id: 'nid',
        type: 'person attribute',
        uuid: config.fieldConfigurations.nid.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: 'NID',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'brn',
        type: 'person attribute',
        uuid: config.fieldConfigurations.brn.personAttributeUuid,
        showHeading: false,
        label: 'Birth Registration Number',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'uid',
        type: 'person attribute',
        uuid: config.fieldConfigurations.uid.personAttributeUuid,
        showHeading: false,
        label: 'UID',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'fullnameBangla',
        type: 'person attribute',
        uuid: config.fieldConfigurations.fullnameBangla.personAttributeUuid,
        showHeading: false,
        label: 'Full Name in Bangla',
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'motherName',
        type: 'person attribute',
        uuid: config.fieldConfigurations.motherName.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: `Mother's Name`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'motherNameBangla',
        type: 'person attribute',
        uuid: config.fieldConfigurations.motherNameBangla.personAttributeUuid,
        showHeading: false,
        label: `Mother's Name in Bangla`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'motherUID',
        type: 'person attribute',
        uuid: config.fieldConfigurations.motherUID.personAttributeUuid,
        showHeading: false,
        label: `Mother's UID`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'fatherNameEnglish',
        type: 'person attribute',
        uuid: config.fieldConfigurations.fatherNameEnglish.personAttributeUuid,
        showHeading: false,

        label: `Father's Name`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'fatherNameBangla',
        type: 'person attribute',
        uuid: config.fieldConfigurations.fatherNameBangla.personAttributeUuid,
        showHeading: false,
        label: `Father's Name in Bangla`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'fatherUID',
        type: 'person attribute',
        uuid: config.fieldConfigurations.fatherUID.personAttributeUuid,
        showHeading: false,
        label: `Father's UID`,
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'birthPlace',
        type: 'person attribute',
        uuid: config.fieldConfigurations.birthPlace.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
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
        id: 'spouseUID',
        type: 'person attribute',
        uuid: config.fieldConfigurations.spouseUID.personAttributeUuid,
        showHeading: false,
        label: `Spouse's UID`,
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
    <PersonAttributeField
      fieldDefinition={{
        id: 'biometricID',
        type: 'person attribute',
        uuid: config.fieldConfigurations.biometricID.personAttributeUuid,
        showHeading: false,
        label: `Biometric ID`,
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
