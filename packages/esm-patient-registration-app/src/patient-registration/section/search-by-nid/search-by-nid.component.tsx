import { Column, Grid, Tile } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { useField } from 'formik';
import React, { useCallback, useContext, useEffect } from 'react';
import { PatientRegistrationContext } from '../../patient-registration-context';

export function SearchByNID() {
  const { setFieldValue, values } = useContext(PatientRegistrationContext);

  const getGender = (gender) => {
    switch (gender) {
      case 'M':
        return 'male';
      case 'F':
        return 'female';
      case 'O':
        return 'other';
      case 'U':
        return 'unknown';
      default:
        return null;
    }
  };

  useEffect(() => {
    if(values.givenName) return;
    const temp = {
      citizenNid: "dddd",
      hid: '98008214606',
      binBrn: '20006825005838716',
      dob: '2000-05-05T00:00:00.000Z',
      mobile: '01634698477',
      gender: 'F',
      nationality: "bang",
      fullNameEnglish: 'TASMIA aa',
      fullNameBangla: 'তাছমিয়া তাবাচ্ছুম',
      motherNameEnglish: null,
      motherNameBangla: null,
      fatherNameEnglish: null,
      fatherNameBangla: null,
    };

    const attributesMapping = {
      '14d4f066-15f5-102d-96e4-000c29c2a5d7': temp.mobile,
      'c9aaba5b-9227-4e30-8067-a6c1f15b0174': temp.fullNameBangla,
      '87a689e1-41cc-41ce-a25e-d3c584673dce': temp.motherNameEnglish,
      '20bdcfd2-c58f-4552-a002-56ceb605c288': temp.motherNameBangla,
      '2b8051e6-3c2d-45b5-ac92-2db429a97edb': temp.fatherNameEnglish,
      '25819ba8-6126-48f3-b8f0-d31960c31e65': temp.fatherNameBangla,
      '26ad0d0b-d6c3-4c78-a4b7-4d4e04bc9e86': temp.nationality,
      '041dcab7-ac07-41aa-928a-1f13e7c65c34': temp.citizenNid
    };

    const defaultValues = {
      gender: getGender(temp.gender),
      givenName: temp.fullNameEnglish.split(" ")[0],
      familyName: temp.fullNameEnglish.split(' ').slice(1).join(' '),
      birthdate: new Date(temp.dob),
    };

    Object.entries(defaultValues).forEach(([key, value]) => {
      setFieldValue(key, value);
    });

    Object.entries(attributesMapping).forEach(([uuid, value]) => {
      setFieldValue(`attributes[${uuid}]`, value);
    });

    console.log('Updated values:', values);
  }, []);

  return (
    <Tile>
      <Grid>Life</Grid>
    </Tile>
  );
}
