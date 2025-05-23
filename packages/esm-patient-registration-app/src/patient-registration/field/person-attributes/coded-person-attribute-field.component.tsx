import { Layer, Select, SelectItem } from '@carbon/react';
import { reportError } from '@openmrs/esm-framework';
import { Field } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LabelWithRequiredIndicator from '../../../components/LabelWithRequiredIndicator';
import { type PersonAttributeTypeResponse } from '../../patient-registration.types';
import { useConceptAnswers } from '../field.resource';

export interface CodedPersonAttributeFieldProps {
  id: string;
  personAttributeType: PersonAttributeTypeResponse;
  answerConceptSetUuid: string;
  label?: string;
  required?: boolean;
  customConceptAnswers: Array<{ uuid: string; label?: string }>;
}

export function CodedPersonAttributeField({
  id,
  personAttributeType,
  answerConceptSetUuid,
  label,
  required,
  customConceptAnswers,
}: CodedPersonAttributeFieldProps) {
  const { data: conceptAnswers, isLoading: isLoadingConceptAnswers } = useConceptAnswers(
    customConceptAnswers.length ? '' : answerConceptSetUuid,
  );

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

  useEffect(() => {
    if (!isLoadingConceptAnswers && !customConceptAnswers.length) {
      if (!conceptAnswers) {
        reportError(
          t(
            'codedPersonAttributeAnswerSetInvalid',
            `The coded person attribute field '{{codedPersonAttributeFieldId}}' has been defined with an invalid answer concept set UUID '{{answerConceptSetUuid}}'.`,
            { codedPersonAttributeFieldId: id, answerConceptSetUuid },
          ),
        );
        setError(true);
      }
      if (conceptAnswers?.length == 0) {
        reportError(
          t(
            'codedPersonAttributeAnswerSetEmpty',
            `The coded person attribute field '{{codedPersonAttributeFieldId}}' has been defined with an answer concept set UUID '{{answerConceptSetUuid}}' that does not have any concept answers.`,
            {
              codedPersonAttributeFieldId: id,
              answerConceptSetUuid,
            },
          ),
        );
        setError(true);
      }
    }
  }, [isLoadingConceptAnswers, conceptAnswers, customConceptAnswers]);

  const answers = useMemo(() => {
    if (customConceptAnswers.length) {
      return customConceptAnswers;
    }
    return isLoadingConceptAnswers || !conceptAnswers
      ? []
      : conceptAnswers
          .map((answer) => ({ ...answer, label: answer.display }))
          .sort((a, b) => a.label.localeCompare(b.label));
  }, [customConceptAnswers, conceptAnswers, isLoadingConceptAnswers]);

  if (error) {
    return null;
  }

  const labelText = <LabelWithRequiredIndicator text={label ?? personAttributeType?.display} isRequired={required} />;
  return (
    <div>
      {!isLoadingConceptAnswers ? (
        // <Layer>
        <Field name={fieldName}>
          {({ field, form: { touched, errors }, meta }) => {
            return (
              <>
                <Select
                  id={id}
                  name={`person-attribute-${personAttributeType.uuid}`}
                  labelText={labelText}
                  invalid={errors[fieldName] && touched[fieldName]}
                  size={'sm'}
                  required={required}
                  {...field}>
                  <SelectItem value={''} text={t('selectAnOption', 'Select an option')} />
                  {answers.map((answer) => (
                    <SelectItem key={answer.uuid} value={answer.uuid} text={t(answer.label.toLowerCase().replace(/ /g,''),answer.label)} />
                  ))}
                </Select>
              </>
            );
          }}
        </Field>
      ) : // </Layer>
      null}
    </div>
  );
}
