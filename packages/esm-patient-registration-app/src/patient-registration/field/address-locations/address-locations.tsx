import { Column, Grid } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { type RegistrationConfig } from '../../../config-schema';
import { useFetchLocations } from '../field.resource';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import LocationField from './components/LocationField';
import useLocationFetch from './hooks/useLocationFetch';

export type AddressLocationType = 'division' | 'district' | 'upazila' | 'paurashava' | 'union' | 'ward';

export const getLocationId = (arr: any[], locationName: string) =>
  arr?.find((item) => item?.description === locationName)?.location_id;

export function AddressLocations() {
  const config = useConfig<RegistrationConfig>();
  const { values, setFieldValue } = useFormikContext();

  const getFieldValue = (name: string) => (values as any)?.attributes?.[name] ?? '';

  const { fetchData: fetchDivision, data: divisions, isLoading: divisionLoading } = useFetchLocations();
  const { fetchData: fetchDistrict, data: districts, isLoading: districtLoading } = useFetchLocations();
  const { fetchData: fetchUpazila, data: Upazilas, isLoading: UpazilaLoading } = useFetchLocations();
  const { fetchData: fetchPaurashava, data: Paurashavas, isLoading: PaurashavaLoading } = useFetchLocations();
  const { fetchData: fetchUnion, data: Unions, isLoading: UnionLoading } = useFetchLocations();
  const { fetchData: fetchWard, data: Wards, isLoading: WardLoading } = useFetchLocations();

  const FIELDS = {
    DIVISION: config.fieldConfigurations.division.personAttributeUuid,
    DISTRICT: config.fieldConfigurations.district.personAttributeUuid,
    UPAZILA: config.fieldConfigurations.upazila.personAttributeUuid,
    PAURASHAVA: config.fieldConfigurations.paurashava.personAttributeUuid,
    UNION: config.fieldConfigurations.union.personAttributeUuid,
    WARD: config.fieldConfigurations.ward.personAttributeUuid,
  };

  const fieldConfigurations = [
    {
      id: 'division' as AddressLocationType,
      name: 'Division',
      fetchNext: fetchDistrict,
      resetFields: ['district', 'upazila', 'paurashava', 'union', 'ward'] as AddressLocationType[],
      data: divisions,
      loading: divisionLoading,
    },
    {
      id: 'district' as AddressLocationType,
      name: 'District',
      fetchNext: fetchUpazila,
      resetFields: ['upazila', 'paurashava', 'union', 'ward'] as AddressLocationType[],
      data: districts,
      loading: districtLoading,
    },
    {
      id: 'upazila' as AddressLocationType,
      name: 'Upazila',
      fetchNext: fetchPaurashava,
      resetFields: ['paurashava', 'union', 'ward'] as AddressLocationType[],
      data: Upazilas,
      loading: UpazilaLoading,
    },
    {
      id: 'paurashava' as AddressLocationType,
      name: 'Paurashava',
      fetchNext: fetchUnion,
      resetFields: ['union', 'ward'] as AddressLocationType[],
      data: Paurashavas,
      loading: PaurashavaLoading,
    },
    {
      id: 'union' as AddressLocationType,
      name: 'Union',
      fetchNext: fetchWard,
      resetFields: ['ward'] as AddressLocationType[],
      data: Unions,
      loading: UnionLoading,
    },
    {
      id: 'ward' as AddressLocationType,
      name: 'Ward',
      resetFields: [] as AddressLocationType[],
      data: Wards,
      loading: WardLoading,
    },
  ];

  useEffect(() => {
    fetchDivision('24525');
  }, []);

  useLocationFetch(getLocationId(divisions.main, getFieldValue(FIELDS.DIVISION)), fetchDistrict, [
    divisions.main,
    getFieldValue(FIELDS.DIVISION),
  ]);
  useLocationFetch(getLocationId(districts.main, getFieldValue(FIELDS.DISTRICT)), fetchUpazila, [
    districts.main,
    getFieldValue(FIELDS.DISTRICT),
  ]);
  useLocationFetch(getLocationId(Upazilas.main, getFieldValue(FIELDS.UPAZILA)), fetchPaurashava, [
    Upazilas.main,
    getFieldValue(FIELDS.UPAZILA),
  ]);
  useLocationFetch(getLocationId(Paurashavas.main, getFieldValue(FIELDS.PAURASHAVA)), fetchUnion, [
    Paurashavas.main,
    getFieldValue(FIELDS.PAURASHAVA),
  ]);
  useLocationFetch(getLocationId(Unions.main, getFieldValue(FIELDS.UNION)), fetchWard, [
    Unions.main,
    getFieldValue(FIELDS.UNION),
  ]);

  const finalInputFields = [
    ...fieldConfigurations.map(({ id, name, fetchNext, resetFields, data, loading }) => (
      <Column key={id} lg={4} md={4} sm={2}>
        <LocationField
          id={id}
          name={name}
          fetchNext={fetchNext}
          resetFields={resetFields}
          data={data}
          loading={loading}
          config={config}
          setFieldValue={setFieldValue}
        />
      </Column>
    )),
    <Column lg={4} md={4} sm={2}>
      <PersonAttributeField
        fieldDefinition={{
          id: 'patientAddress',
          type: 'person attribute',
          uuid: config.fieldConfigurations.patientAddress.personAttributeUuid,
          showHeading: false,
          label: 'Address',
          ...config.fieldConfigurations.patientAddress,
        }}
      />
    </Column>,
  ];

  return <div>{!divisionLoading && <Grid>{finalInputFields}</Grid>}</div>;
}
