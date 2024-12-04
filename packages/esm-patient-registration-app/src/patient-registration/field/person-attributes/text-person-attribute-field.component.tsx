import { Field } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import { type PersonAttributeTypeResponse } from '../../patient-registration.types';

export interface TextPersonAttributeFieldProps {
  id: string;
  personAttributeType: PersonAttributeTypeResponse;
  validationRegex?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  hide?:boolean;
}

export function TextPersonAttributeField({
  id,
  personAttributeType,
  validationRegex,
  label,
  required,
  disabled,
  hide
}: TextPersonAttributeFieldProps) {
  const { t } = useTranslation();

  const validateInput = (value: string) => {
    if (!value || !validationRegex || validationRegex === '' || typeof validationRegex !== 'string' || value === '') {
      return;
    }
    const regex = new RegExp(validationRegex);
    if (regex.test(value)) {
      return;
    } else {
      return t('invalidInput', 'Invalid Input');
    }
  };

  const fieldName = `attributes.${personAttributeType.uuid}`;

  return (
    !hide&& <div>
      <Field name={fieldName} validate={validateInput}>
        {({ field, form: { touched, errors }, meta }) => {
          return (
            <Input
              id={id}
              name={`person-attribute-${personAttributeType.uuid}`}
              labelText={label ?? personAttributeType?.display}
              invalid={errors[fieldName] && touched[fieldName]}
              {...field}
              disabled={disabled}
              required={required}
            />
          );
        }}
      </Field>
    </div>
  );
}
