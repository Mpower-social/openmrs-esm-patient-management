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

  const getFieldValue = (name: string) => (values as any)?.attributes?.[name];

  const { fetchData: fetchDivision, data: divisions, isLoading: divisionLoading } = useFetchLocations();
  const {
    fetchData: fetchDistrict,
    data: districts,
    isLoading: districtLoading,
    resetState: resetDistrict,
  } = useFetchLocations();
  const {
    fetchData: fetchUpazila,
    data: Upazilas,
    isLoading: UpazilaLoading,
    resetState: resetUpazila,
  } = useFetchLocations();
  const {
    fetchData: fetchPaurashava,
    data: Paurashavas,
    isLoading: PaurashavaLoading,
    resetState: resetPaurashava,
  } = useFetchLocations();

  const { fetchData: fetchUnion, data: Unions, isLoading: UnionLoading, resetState: resetUnion } = useFetchLocations();
  const { fetchData: fetchWard, data: Wards, isLoading: WardLoading, resetState: resetWard } = useFetchLocations();
  const getConceptId = (name: string) => config.fieldConfigurations[name].personAttributeUuid;

  const FIELDS = {
    DIVISION: getConceptId('division'),
    DIVISION_ID: getConceptId('divisionId'),
    DISTRICT: getConceptId('district'),
    DISTRICT_ID: getConceptId('districtId'),
    UPAZILA: getConceptId('upazila'),
    UPAZILA_ID: getConceptId('upazilaId'),
    PAURASHAVA: getConceptId('paurashava'),
    PAURASHAVA_ID: getConceptId('paurashavaId'),
    UNION: getConceptId('union'),
    UNION_ID: getConceptId('unionId'),
    WARD: getConceptId('ward'),
    WARD_ID: getConceptId('wardId'),
  };

  const fieldConfigurations = [
    {
      id: 'division' as AddressLocationType,
      name: 'Division',
      fieldId: FIELDS.DIVISION_ID,
      fetchNext: fetchDistrict,
      resetFields: [
        FIELDS.DISTRICT,
        FIELDS.DISTRICT_ID,
        FIELDS.UPAZILA,
        FIELDS.UPAZILA_ID,
        FIELDS.PAURASHAVA,
        FIELDS.PAURASHAVA_ID,
        FIELDS.UNION,
        FIELDS.UNION_ID,
        FIELDS.WARD,
        FIELDS.WARD_ID,
      ],
      resetStates: [resetDistrict, resetUpazila, resetPaurashava, resetUnion, resetWard],
      data: divisions,
      loading: divisionLoading,
    },
    {
      id: 'district' as AddressLocationType,
      name: 'District',
      fieldId: FIELDS.DISTRICT_ID,
      fetchNext: fetchUpazila,
      resetFields: [
        FIELDS.UPAZILA,
        FIELDS.UPAZILA_ID,
        FIELDS.PAURASHAVA,
        FIELDS.PAURASHAVA_ID,
        FIELDS.UNION,
        FIELDS.UNION_ID,
        FIELDS.WARD,
        FIELDS.WARD_ID,
      ],
      resetStates: [resetUpazila, resetPaurashava, resetUnion, resetWard],
      data: districts,
      loading: districtLoading || !getFieldValue(FIELDS.DIVISION),
    },
    {
      id: 'upazila' as AddressLocationType,
      name: 'Upazila',
      fieldId: FIELDS.UPAZILA_ID,
      fetchNext: fetchPaurashava,
      resetFields: [
        FIELDS.PAURASHAVA,
        FIELDS.PAURASHAVA_ID,
        FIELDS.UNION,
        FIELDS.UNION_ID,
        FIELDS.WARD,
        FIELDS.WARD_ID,
      ],
      resetStates: [resetPaurashava, resetUnion, resetWard],
      data: Upazilas,
      loading: UpazilaLoading || (!getFieldValue(FIELDS.DIVISION) && !getFieldValue(FIELDS.DISTRICT)),
    },
    {
      id: 'paurashava' as AddressLocationType,
      name: 'Paurashava',
      fieldId: FIELDS.PAURASHAVA_ID,
      fetchNext: fetchUnion,
      resetFields: [FIELDS.UNION, FIELDS.UNION_ID, FIELDS.WARD, FIELDS.WARD_ID],
      resetStates: [resetUnion, resetWard],
      data: Paurashavas,
      loading:
        PaurashavaLoading ||
        (!getFieldValue(FIELDS.DIVISION) && !getFieldValue(FIELDS.DISTRICT) && !getFieldValue(FIELDS.UPAZILA)),
    },
    {
      id: 'union' as AddressLocationType,
      name: 'Union',
      fetchNext: fetchWard,
      fieldId: FIELDS.UNION_ID,
      resetFields: [FIELDS.WARD, FIELDS.WARD_ID],
      resetStates: [resetWard],
      data: Unions,
      loading:
        UnionLoading ||
        (!getFieldValue(FIELDS.DIVISION) &&
          !getFieldValue(FIELDS.DISTRICT) &&
          !getFieldValue(FIELDS.UPAZILA) &&
          !getFieldValue(FIELDS.PAURASHAVA)),
    },
    {
      id: 'ward' as AddressLocationType,
      name: 'Ward',
      fieldId: FIELDS.WARD_ID,
      resetFields: [],
      resetStates: [],
      data: Wards,
      loading:
        WardLoading ||
        (!getFieldValue(FIELDS.DIVISION) &&
          !getFieldValue(FIELDS.DISTRICT) &&
          !getFieldValue(FIELDS.UPAZILA) &&
          !getFieldValue(FIELDS.UNION)),
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
    ...fieldConfigurations.map(({ id, name, fetchNext, resetFields, data, loading, resetStates, fieldId }) => (
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
          resetStates={resetStates}
          fieldId={fieldId}
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
    </Column>
  ];

  return <div>{!divisionLoading && <Grid>{finalInputFields}</Grid>}</div>;
}
