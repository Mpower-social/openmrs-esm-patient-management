import { Field } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { type PersonAttributeTypeResponse } from '../../patient-registration.types';
import { DatePicker, DatePickerInput } from '@carbon/react';
import { generateFormatting } from '../../date-util';
import { PatientRegistrationContext } from '../../patient-registration-context';

export interface DatePickerPersonAttributeFieldProps {
  id: string;
  personAttributeType: PersonAttributeTypeResponse;
  label?: string;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: any;
  range?: object;
}

export function DatePickerPersonAttributeField({
  id,
  personAttributeType,
  label,
  required,
  readOnly,
  defaultValue,
  range,
}: DatePickerPersonAttributeFieldProps) {
  const { t } = useTranslation();
  const { format, placeHolder, dateFormat } = generateFormatting(['d', 'm', 'Y'], '/');
  const today = new Date();
  const fieldName = `attributes.${personAttributeType.uuid}`;

  const { setFieldValue } = useContext(PatientRegistrationContext);

  function formatDateSimple(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
  }

  return (
    <div>
      <Field name={fieldName}>
        {({ field, form: { touched, errors }, meta }) => {
          useEffect(() => {
            if (!field.value && defaultValue) {
              setFieldValue(fieldName, format(defaultValue));
            }
          }, []);
          const value =
            field.value && field.value.includes('T') ? formatDateSimple(field.value.split('T')[0]) : field.value;
          return (
            <>
              <DatePicker
                dateFormat={dateFormat}
                datePickerType="single"
                {...{
                  field,
                  value: value ? value : defaultValue,
                  onChange: ([date]) => setFieldValue(fieldName, format(date)),
                }}
                required={required}
                // {...range}
                readOnly={readOnly}>
                <DatePickerInput
                  labelText={label ?? personAttributeType?.display}
                  id={id}
                  invalid={errors[fieldName] && touched[fieldName]}
                  size="sm"
                />
              </DatePicker>
            </>
          );
        }}
      </Field>
    </div>
  );
}
