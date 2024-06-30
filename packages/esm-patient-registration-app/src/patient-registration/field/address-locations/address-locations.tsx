import { Column, Grid } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { type RegistrationConfig } from '../../../config-schema';
import { AddressLocationsAttributeField } from '../address-locations-attributes/address-locations-attribute-field.component';
import { useFetchLocations } from '../field.resource';

type LocationType = 'division' | 'district' | 'upazila' | 'paurashava' | 'union' | 'ward';

const getLocationId = (arr: any[], locationName: string) =>
  arr?.find((item) => item?.description === locationName)?.location_id;

export function AddressLocations() {
  const config = useConfig<RegistrationConfig>();
  const { values, setFieldValue } = useFormikContext();

  const { fetchData: fetchDivision, data: divisions, isLoading: divisionLoading } = useFetchLocations();
  const { fetchData: fetchDistrict, data: districts, isLoading: districtLoading } = useFetchLocations();
  const { fetchData: fetchUpazila, data: Upazilas, isLoading: UpazilaLoading } = useFetchLocations();
  const { fetchData: fetchPaurashava, data: Paurashavas, isLoading: PaurashavaLoading } = useFetchLocations();
  const { fetchData: fetchUnion, data: Unions, isLoading: UnionLoading } = useFetchLocations();
  const { fetchData: fetchWard, data: Wards, isLoading: WardLoading } = useFetchLocations();

  const resetCascadeFields = (fields: LocationType[]) =>
    fields.forEach((name) => setFieldValue(`attributes.${name}`, ''));

  const getFieldValue = (name: string) => (values as any)?.attributes?.[name] ?? '';

  const FIELDS = {
    DIVISION: config.fieldConfigurations.division.personAttributeUuid,
    DISTRICT: config.fieldConfigurations.district.personAttributeUuid,
    UPAZILA: config.fieldConfigurations.upazila.personAttributeUuid,
    PAURASHAVA: config.fieldConfigurations.paurashava.personAttributeUuid,
    UNION: config.fieldConfigurations.union.personAttributeUuid,
    WARD: config.fieldConfigurations.ward.personAttributeUuid,
  };
  // DIVISION fetching
  useEffect(() => {
    fetchDivision('24525');
  }, []);

  // DISTRICT fetching
  useEffect(() => {
    const filedValue = getFieldValue(FIELDS.DIVISION);
    if (filedValue) {
      const id = getLocationId(divisions.main, filedValue);
      if (id) {
        fetchDistrict(id);
      }
    }
  }, [getFieldValue(FIELDS.DIVISION), divisions.main]);

  // UPAZILA fetching
  useEffect(() => {
    const filedValue = getFieldValue(FIELDS.DISTRICT);
    if (filedValue) {
      const id = getLocationId(districts.main, filedValue);
      if (id) {
        fetchUpazila(id);
      }
    }
  }, [getFieldValue(FIELDS.DISTRICT), districts.main]);

  // PAURASHAVA fetching
  useEffect(() => {
    const filedValue = getFieldValue(FIELDS.UPAZILA);
    if (filedValue) {
      const id = getLocationId(Upazilas.main, filedValue);
      if (id) {
        fetchPaurashava(id);
      }
    }
  }, [getFieldValue(FIELDS.UPAZILA), Upazilas.main]);

  // UNION fetching
  useEffect(() => {
    const filedValue = getFieldValue(FIELDS.PAURASHAVA);
    if (filedValue) {
      const id = getLocationId(Paurashavas.main, filedValue);
      if (id) {
        fetchUnion(id);
      }
    }
  }, [getFieldValue(FIELDS.PAURASHAVA), Paurashavas.main]);

  // WARD fetching
  useEffect(() => {
    const filedValue = getFieldValue(FIELDS.UNION);
    if (filedValue) {
      const id = getLocationId(Unions.main, filedValue);
      if (id) {
        fetchWard(id);
      }
    }
  }, [getFieldValue(FIELDS.UNION), Unions.main]);

  const handleFieldChange = (
    locationId: string,
    resetFields: LocationType[],
    fetchNext: (id: string) => void,
    mainData: any[],
  ) => {
    resetCascadeFields(resetFields);
    const location_id = getLocationId(mainData, locationId);
    if (location_id && fetchNext) {
      fetchNext(location_id);
    }
  };

  const fieldConfigurations = [
    {
      id: 'division' as LocationType,
      name: 'Division' as LocationType,
      fetchNext: fetchDistrict,
      resetFields: [FIELDS.DISTRICT, FIELDS.UPAZILA, FIELDS.PAURASHAVA, FIELDS.UNION, FIELDS.WARD] as LocationType[],
      data: divisions,
      loading: divisionLoading,
    },
    {
      id: 'district' as LocationType,
      name: 'District' as LocationType,
      fetchNext: fetchUpazila,
      resetFields: [FIELDS.UPAZILA, FIELDS.PAURASHAVA, FIELDS.UNION, FIELDS.WARD] as LocationType[],
      data: districts,
      loading: districtLoading,
    },
    {
      id: 'upazila' as LocationType,
      name: 'Upazila' as LocationType,
      fetchNext: fetchPaurashava,
      resetFields: [FIELDS.PAURASHAVA, FIELDS.UNION, FIELDS.WARD] as LocationType[],
      data: Upazilas,
      loading: UpazilaLoading,
    },
    {
      id: 'paurashava' as LocationType,
      name: 'Paurashava' as LocationType,
      fetchNext: fetchUnion,
      resetFields: [FIELDS.UNION, FIELDS.WARD] as LocationType[],
      data: Paurashavas,
      loading: PaurashavaLoading,
    },
    {
      id: 'union' as LocationType,
      name: 'Union' as LocationType,
      fetchNext: fetchWard,
      resetFields: [FIELDS.WARD] as LocationType[],
      data: Unions,
      loading: UnionLoading,
    },
    {
      id: 'ward' as LocationType,
      name: 'Ward' as LocationType,
      data: Wards,
      loading: WardLoading,
    },
  ];

  const otherInputFields = fieldConfigurations.map(({ id, fetchNext, resetFields, data, loading, name }) => (
    <AddressLocationsAttributeField
      key={id}
      fieldDefinition={{
        id,
        type: 'person attribute',
        uuid: FIELDS[id.toUpperCase() as keyof typeof FIELDS],
        showHeading: false,
        label: name,
        customConceptAnswers: data?.processed ?? [],
        ...config.fieldConfigurations[id],
      }}
      onChange={(locationId) => fetchNext && handleFieldChange(locationId, resetFields, fetchNext, data.main)}
      disabled={loading}
    />
  ));

  return (
    <div>
      {!divisionLoading && (
        <Grid>
          {otherInputFields.map((field, index) => (
            <Column key={index} lg={4} md={4} sm={2}>
              {field}
            </Column>
          ))}
        </Grid>
      )}
    </div>
  );
}
