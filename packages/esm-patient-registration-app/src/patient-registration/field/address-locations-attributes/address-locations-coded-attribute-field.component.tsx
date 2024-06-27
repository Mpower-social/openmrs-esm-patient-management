import { Layer, Select, SelectItem } from '@carbon/react';
import { reportError } from '@openmrs/esm-framework';
import { Field } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LabelWithRequiredIndicator from '../../../components/LabelWithRequiredIndicator';
import { type PersonAttributeTypeResponse } from '../../patient-registration.types';

export interface AddressLocationsCodedAttributeFieldProps {
  id: string;
  personAttributeType: PersonAttributeTypeResponse;
  answerConceptSetUuid: string;
  label?: string;
  required?: boolean;
  isLoading?: boolean;
  customConceptAnswers: Array<{ uuid: string; label?: string }>;
}

export function AddressLocationsCodedAttributeField({
  id,
  personAttributeType,
  answerConceptSetUuid,
  label,
  required,
  customConceptAnswers,
  isLoading,
}: AddressLocationsCodedAttributeFieldProps) {
  const { t } = useTranslation();
  const fieldName = `attributes.${personAttributeType.uuid}`;
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!answerConceptSetUuid && !customConceptAnswers.length) {
      reportError(
        t(
          'codedPersonAttributeNoAnswerSet',
          `The person attribute field '{{codedPersonAttributeFieldId}}' is of type 'coded' but has been defined without an answer concept set UUID. The 'answerConceptSetUuid' key is required.`,
          { codedPersonAttributeFieldId: id },
        ),
      );
      setError(true);
    }
  }, [answerConceptSetUuid, customConceptAnswers]);

  const answers = useMemo(() => {
    if (customConceptAnswers.length) {
      return customConceptAnswers;
    }
  }, [customConceptAnswers]);

  if (error) {
    return null;
  }

  const labelText = <LabelWithRequiredIndicator text={label ?? personAttributeType?.display} isRequired={required} />;
  return (
    <div>
      {!isLoading ? (
        <Layer>
          <Field name={fieldName}>
            {({ field, form: { touched, errors }, meta }) => {
              return (
                <>
                  <pre> {JSON.stringify(field)}</pre>
                  <Select
                    id={id}
                    name={`person-attribute-${personAttributeType.uuid}`}
                    labelText={labelText}
                    invalid={errors[fieldName] && touched[fieldName]}
                    size={'sm'}
                    required={required}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      console.log(e.target.value);
                    }}>
                    <SelectItem value={''} text={t('selectAnOption', 'Select an option')} />
                    {answers.map((answer) => (
                      <SelectItem key={answer.uuid} value={answer.uuid} text={answer.label} />
                    ))}
                  </Select>
                </>
              );
            }}
          </Field>
        </Layer>
      ) : null}
    </div>
  );
}
