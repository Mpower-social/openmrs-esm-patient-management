import { Button, Column, Grid, Tile, Dropdown, DatePicker, DatePickerInput, Search, Loading } from '@carbon/react';
import { isDesktop, useLayoutType } from '@openmrs/esm-framework';
import { useField } from 'formik';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PatientRegistrationContext } from '../../patient-registration-context';
import { getDataByNID } from '../../patient-registration.resource';
import styles from '../../patient-registration.scss';

export function SearchByNID() {
  const { setFieldValue, values } = useContext(PatientRegistrationContext);
  const [searchBody, setSearchBody] = useState<any>();
  const [loading, setLoadingSet] = useState(false);
  const layout = useLayoutType();

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

  function isLastRoutePatientRegistration() {
    const segments = window.location.pathname.split('/');
    const lastSegment = segments.filter((segment) => segment !== '').pop();
    return lastSegment === 'patient-registration';
  }

  const searchByNIDHandler = async () => {
    if (!isLastRoutePatientRegistration() || Object.values(searchBody).filter((el) => el).length < 3) return;

    try {
      setLoadingSet(true);
      const res = await getDataByNID(searchBody);
      const temp = res.data.personInformation;
      const attributesMapping = {
        '14d4f066-15f5-102d-96e4-000c29c2a5d7': temp.mobile,
        'c9aaba5b-9227-4e30-8067-a6c1f15b0174': temp.fullNameBangla,
        '87a689e1-41cc-41ce-a25e-d3c584673dce': temp.motherNameEnglish,
        '20bdcfd2-c58f-4552-a002-56ceb605c288': temp.motherNameBangla,
        '2b8051e6-3c2d-45b5-ac92-2db429a97edb': temp.fatherNameEnglish,
        '25819ba8-6126-48f3-b8f0-d31960c31e65': temp.fatherNameBangla,
        '26ad0d0b-d6c3-4c78-a4b7-4d4e04bc9e86': temp.nationality,
        '041dcab7-ac07-41aa-928a-1f13e7c65c34': temp.citizenNid,
      };

      const defaultValues = {
        gender: getGender(temp.gender),
        givenName: temp.fullNameEnglish.split(' ')[0],
        familyName: temp.fullNameEnglish.split(' ').slice(1).join(' '),
        birthdate: new Date(temp.dob),
      };

      Object.entries(defaultValues).forEach(([key, value]) => {
        setFieldValue(key, value);
      });

      Object.entries(attributesMapping).forEach(([uuid, value]) => {
        setFieldValue(`attributes[${uuid}]`, value);
      });
      setLoadingSet(false);
    } catch (e) {
      setLoadingSet(false);
    }
  };

  useEffect(() => {
    //searchByNIDHandler();
  }, []);

  const items = [
    { id: 'nid', text: 'NID' },
    { id: 'hid', text: 'HID' },
    { id: 'brid', text: 'BRID' },
  ];
  return (
    <>
      {loading && <Loading />}

      {isLastRoutePatientRegistration() && (
        <Tile style={{ marginBottom: '20px' }}>
          <div className={!isDesktop(layout) ? styles.tabletHeading : styles.desktopHeading}>
            <h4>Search</h4>
          </div>
          <Grid>
            <Column sm={8} md={8} lg={4}>
              <Dropdown
                id="carbon-dropdown-example"
                titleText="ID Type"
                label="Select an option"
                items={items}
                itemToString={(item) => (item ? item.text : '')}
                onChange={(e) => setSearchBody({ ...searchBody, type: e.selectedItem.id })}
              />
            </Column>
            <Column sm={8} md={8} lg={4}>
              <DatePicker
                datePickerType="single"
                onChange={(e) => setSearchBody({ ...searchBody, dob: new Date(e[0]).toLocaleDateString('en-CA') })}>
                <DatePickerInput id="date-picker-default-id" placeholder="mm/dd/yyyy" labelText="DOB" type="text" />
              </DatePicker>
            </Column>
            <Column sm={8} md={8} lg={5}>
              <div style={{ paddingTop: '20px' }}>
                <Search
                  id="search-1"
                  labelText="Text"
                  placeHolderText="Text"
                  onChange={(e) => setSearchBody({ ...searchBody, text: e.target.value })}
                />
              </div>
            </Column>
            <Column sm={8} md={8} lg={3}>
              <div style={{ paddingTop: '10px' }}>
                <Button onClick={searchByNIDHandler}>Search</Button>
              </div>
            </Column>
          </Grid>
        </Tile>
      )}
    </>
  );
}
