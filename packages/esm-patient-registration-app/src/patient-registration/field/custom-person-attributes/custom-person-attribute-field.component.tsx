import { InlineNotification, TextInputSkeleton } from '@carbon/react';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type FieldDefinition } from '../../../config-schema';
import styles from '../field.scss';
import { CodedPersonAttributeField } from '../person-attributes/coded-person-attribute-field.component';
import { usePersonAttributeType } from '../person-attributes/person-attributes.resource';
import { TextPersonAttributeField } from '../person-attributes/text-person-attribute-field.component';

export interface CustomPersonAttributeFieldProps {
  fieldDefinition: FieldDefinition;
}

export function CustomPersonAttributeField({ fieldDefinition }: CustomPersonAttributeFieldProps) {
  const { data: personAttributeType, isLoading, error } = usePersonAttributeType(fieldDefinition.uuid);
  const { t } = useTranslation();

  const personAttributeField = useMemo(() => {
    if (!personAttributeType) {
      return null;
    }
    switch (personAttributeType.format) {
      case 'java.lang.String':
        return (
          <TextPersonAttributeField
            personAttributeType={personAttributeType}
            validationRegex={fieldDefinition.validation?.matches ?? ''}
            label={fieldDefinition.label}
            required={fieldDefinition.validation?.required ?? false}
            id={fieldDefinition?.id}
          />
        );
      case 'org.openmrs.Concept':
      case 'org.openmrs.Encounter':
        return (
          <CodedPersonAttributeField
            personAttributeType={personAttributeType}
            answerConceptSetUuid={fieldDefinition.answerConceptSetUuid}
            label={fieldDefinition.label}
            id={fieldDefinition?.id}
            required={fieldDefinition.validation?.required ?? false}
            customConceptAnswers={fieldDefinition.customConceptAnswers ?? []}
          />
        );

      default:
        return (
          <InlineNotification kind="error" title="Error">
            {t(
              'unknownPatientAttributeType',
              'Patient attribute type has unknown format {{personAttributeTypeFormat}}',
              {
                personAttributeTypeFormat: personAttributeType.format,
              },
            )}
          </InlineNotification>
        );
    }
  }, [personAttributeType, fieldDefinition, t]);

  if (isLoading) {
    return (
      <div>
        {fieldDefinition.showHeading && <h4 className={styles.productiveHeading02Light}>{fieldDefinition?.label}</h4>}
        <TextInputSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {fieldDefinition.showHeading && <h4 className={styles.productiveHeading02Light}>{fieldDefinition?.label}</h4>}
        <InlineNotification kind="error" title={t('error', 'Error')}>
          {t('unableToFetch', 'Unable to fetch person attribute type - {{personattributetype}}', {
            personattributetype: fieldDefinition?.label ?? fieldDefinition?.id,
          })}
        </InlineNotification>
      </div>
    );
  }

  return (
    <div>
      {fieldDefinition.showHeading && (
        <h4 className={styles.productiveHeading02Light}>{fieldDefinition?.label ?? personAttributeType?.display}</h4>
      )}
      {personAttributeField}
    </div>
  );
}
