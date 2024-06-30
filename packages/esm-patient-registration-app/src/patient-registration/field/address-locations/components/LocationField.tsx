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
  setFieldValue,
}: {
  id: AddressLocationType;
  name: string;
  fetchNext?: (id: string) => void;
  resetFields: AddressLocationType[];
  data: any;
  loading: boolean;
  config: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}) => {
  const handleFieldChange = (locationId: string) => {
    resetFields.forEach((field) => setFieldValue(`attributes.${field}`, ''));
    const location_id = getLocationId(data.main, locationId);
    if (location_id && fetchNext) {
      fetchNext(location_id);
    }
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
