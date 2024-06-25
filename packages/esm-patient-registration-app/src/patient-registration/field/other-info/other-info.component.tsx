import { Column, DatePicker, DatePickerInput, Grid } from '@carbon/react';
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
        validation: {
          required: true,
        },
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
      validation: {
        required: true,
      },
      label: 'Marital Status',
    }}
  />
  
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
