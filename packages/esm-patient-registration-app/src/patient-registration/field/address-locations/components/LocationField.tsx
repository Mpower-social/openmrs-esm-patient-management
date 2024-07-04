import React from 'react';
import { AddressLocationsAttributeField } from '../../address-locations-attributes/address-locations-attribute-field.component';
import { getLocationId, type AddressLocationType } from '../address-locations';

const LocationField = ({
  id,
  name,
  fetchNext,
  resetFields,
  data,
  loading,
  config,
  fieldId,
  setFieldValue,
  resetStates,
}: {
  id: AddressLocationType;
  name: string;
  fieldId?: string;
  fetchNext?: (id: string) => void;
  resetFields: string[];
  data: any;
  loading: boolean;
  config: any;
  resetStates?: any[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}) => {
  const handleFieldChange = (locationId: string) => {
    const location_id = getLocationId(data.main, locationId);
    resetFields.forEach((field) => setFieldValue(`attributes.${field}`, ''));

    if (resetStates.length) {
      resetStates.forEach((item) => item());
    }

    if (fieldId) {
      setFieldValue(`attributes.${fieldId}`, (location_id ?? '').toString());
    }

    // if (location_id && fetchNext) {
    //   fetchNext(location_id);
    // }
  };

  return (
    <AddressLocationsAttributeField
      fieldDefinition={{
        id,
        type: 'person attribute',
        uuid: config.fieldConfigurations[id].personAttributeUuid,
        showHeading: false,
        label: name,
        customConceptAnswers: data?.processed ?? [],
        ...config.fieldConfigurations[id],
      }}
      onChange={handleFieldChange}
      disabled={loading}
    />
  );
};

export default LocationField;
