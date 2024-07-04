import { Layer } from '@carbon/react';
import React, { useMemo } from 'react';
import { SelectInput } from '../../input/basic-input/select/select-input.component';
import { type PersonAttributeTypeResponse } from '../../patient-registration.types';

export interface AddressLocationsCodedAttributeFieldProps {
  id: string;
  personAttributeType: PersonAttributeTypeResponse;
  answerConceptSetUuid: string;
  label?: string;
  required?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onChange?: Function;
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
  onChange,
  disabled,
}: AddressLocationsCodedAttributeFieldProps) {
  const fieldName = `attributes.${personAttributeType.uuid}`;
  const answers = useMemo(() => {
    if (customConceptAnswers.length) {
      return customConceptAnswers;
    }
    return [];
  }, [customConceptAnswers]);

  return (
    <div>
      {!isLoading ? (
        <>
          <SelectInput
            name={fieldName}
            label={label ?? personAttributeType?.display}
            options={answers.map((item) => ({
              value: item.uuid,
              text: item.label,
            }))}
            required={required}
            onChange={onChange}
            disabled={disabled}
          />
        </>
      ) : null}
    </div>
  );
}
