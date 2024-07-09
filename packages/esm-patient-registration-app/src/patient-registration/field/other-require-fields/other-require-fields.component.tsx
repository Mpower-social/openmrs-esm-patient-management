import { Column, Grid, Dropdown, SelectItem } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import React, { useEffect, useState } from 'react';
import { type RegistrationConfig } from '../../../config-schema';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { SelectInput } from '../../input/basic-input/select/select-input.component';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

export function OtherRequireFields() {
  const config = useConfig<RegistrationConfig>();
  const { values, setFieldValue } = useFormikContext();
  const { t } = useTranslation();

  useEffect(() => {
    (values as any).gender &&
      setFieldValue(
        'idType',
        (values as any)?.attributes?.[config.fieldConfigurations.brn.personAttributeUuid]
          ? 'brd'
          : (values as any)?.attributes?.[config.fieldConfigurations.nid.personAttributeUuid]
            ? 'nid'
            : 'none',
      );
  }, [
    (values as any)?.attributes?.[config.fieldConfigurations.nid.personAttributeUuid],
    (values as any)?.attributes?.[config.fieldConfigurations.nid.personAttributeUuid],
  ]);

  const otherInputFields = [
    <SelectInput
      name="gender"
      options={[
        { value: 'male', text: t('male', 'Male') },
        { value: 'female', text: t('female', 'Female') },
        { value: 'other', text: t('other', 'Other') },
        { value: 'unknown', text: t('unknown', 'Unknown') },
      ]}
      required
      label={t('gender', 'Gender')}
    />,

    <PersonAttributeField
      fieldDefinition={{
        id: 'mobileNo',
        type: 'person attribute',
        uuid: config.fieldConfigurations.phone.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: t('mobileNo', 'Mobile No'),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'maritalStatus',
        type: 'person attribute',
        uuid: config.fieldConfigurations.maritalStatus.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        answerConceptSetUuid: 'c955a699-5f57-4a92-a7e4-30c6215430e9',
        label: t('maritalStatus', 'Marital Status'),
      }}
    />,
    //"6e4a97f3-e6ab-4bf0-8fbd-8bf8b0361500" uuid of married concept
    ((values as any)?.attributes?.[config.fieldConfigurations.maritalStatus.personAttributeUuid] ===
      '6e4a97f3-e6ab-4bf0-8fbd-8bf8b0361500' ||
      (values as any)?.attributes?.[config.fieldConfigurations.spouseNameEnglish.personAttributeUuid]) && (
      <PersonAttributeField
        fieldDefinition={{
          id: 'spouseNameEnglish',
          type: 'person attribute',
          uuid: config.fieldConfigurations.spouseNameEnglish.personAttributeUuid,
          showHeading: false,
          validation: {
            required: true,
          },
          label: t('spouseNameEnglish', `Spouse's Name`),
        }}
      />
    ),
    //"6e4a97f3-e6ab-4bf0-8fbd-8bf8b0361500" uuid of married concept
    ((values as any)?.attributes?.[config.fieldConfigurations.maritalStatus.personAttributeUuid] ===
      '6e4a97f3-e6ab-4bf0-8fbd-8bf8b0361500' ||
      (values as any)?.attributes?.[config.fieldConfigurations.spouseNameBangla.personAttributeUuid]) && (
      <PersonAttributeField
        fieldDefinition={{
          id: 'spouseNameBangla',
          type: 'person attribute',
          uuid: config.fieldConfigurations.spouseNameBangla.personAttributeUuid,
          showHeading: false,
          label: t('spouseNameBangla', `Spouse's Name in Bangla`),
        }}
      />
    ),
    <PersonAttributeField
      fieldDefinition={{
        id: 'bloodGroup',
        type: 'person attribute',
        uuid: config.fieldConfigurations.bloodGroup.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        answerConceptSetUuid: '4c2a94c6-5a14-485e-b0f5-01921750b9b6',
        label: t('bloodGroup', 'Blood Group'),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'religion',
        type: 'person attribute',
        uuid: config.fieldConfigurations.religion.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        answerConceptSetUuid: '43eee45a-082e-4216-8107-9f9e1977330b',
        label: t('religion', 'Religion'),
      }}
    />,
    <SelectInput
      name="idType"
      options={[
        { value: 'nid', text: 'NID' },
        { value: 'brn', text: 'BRN' },
        { value: 'none', text: t('none', 'None') },
      ]}
      defaultValue={'nid'}
      required={
        (values as any)?.attributes?.[config.fieldConfigurations.nid.personAttributeUuid] &&
        (values as any)?.attributes?.[config.fieldConfigurations.nid.personAttributeUuid]
          ? false
          : true
      }
      label={t('idType', 'Id Type')}
    />,
    ((values as any)?.idType === 'nid' ||
      (values as any)?.attributes?.[config.fieldConfigurations.nid.personAttributeUuid]) && (
      <PersonAttributeField
        fieldDefinition={{
          id: 'nid',
          type: 'person attribute',
          uuid: config.fieldConfigurations.nid.personAttributeUuid,
          showHeading: false,
          validation: {
            required: true,
          },
          label: t('nid', 'NID'),
        }}
      />
    ),
    ((values as any)?.idType === 'brn' ||
      (values as any)?.attributes?.[config.fieldConfigurations.brn.personAttributeUuid]) && (
      <PersonAttributeField
        fieldDefinition={{
          id: 'brn',
          type: 'person attribute',
          uuid: config.fieldConfigurations.brn.personAttributeUuid,
          showHeading: false,
          validation: {
            required: true,
          },
          label: t('brn', 'Birth Registration Number'),
        }}
      />
    ),
    <PersonAttributeField
      fieldDefinition={{
        id: 'fullNameBangla',
        type: 'person attribute',
        uuid: config.fieldConfigurations.fullNameBangla.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: t('fullNameBangla', 'Full Name in Bangla'),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'motherName',
        type: 'person attribute',
        uuid: config.fieldConfigurations.motherName.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: t('motherName', `Mother's Name`),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'motherNameBangla',
        type: 'person attribute',
        uuid: config.fieldConfigurations.motherNameBangla.personAttributeUuid,
        showHeading: false,
        label: t('motherNameBangla', `Mother's Name in Bangla`),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'fatherNameEnglish',
        type: 'person attribute',
        uuid: config.fieldConfigurations.fatherNameEnglish.personAttributeUuid,
        showHeading: false,
        validation: {
          required: true,
        },
        label: t('fatherNameEnglish', `Father's Name`),
      }}
    />,
    <PersonAttributeField
      fieldDefinition={{
        id: 'fatherNameBangla',
        type: 'person attribute',
        uuid: config.fieldConfigurations.fatherNameBangla.personAttributeUuid,
        showHeading: false,
        label: t('fatherNameBangla', `Father's Name in Bangla`),
      }}
    />,
  ].filter(Boolean);

  return (
    <div>
      <br />
      <Grid>
        {otherInputFields.map((field, index) => (
          <Column key={index} lg={4} md={4} sm={2}>
            {field}
          </Column>
        ))}
      </Grid>
    </div>
  );
}
