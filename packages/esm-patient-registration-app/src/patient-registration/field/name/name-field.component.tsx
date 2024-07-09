import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentSwitcher, Switch, Column, Grid } from '@carbon/react';
import { useField } from 'formik';
import { ExtensionSlot, useConfig } from '@openmrs/esm-framework';
import { Input } from '../../input/basic-input/input/input.component';
import { PatientRegistrationContext } from '../../patient-registration-context';
import styles from '../field.scss';
import { type RegistrationConfig } from '../../../config-schema';

export const unidentifiedPatientAttributeTypeUuid = '8b56eac7-5c76-4b9c-8c6f-1deab8d3fc47';
const containsNoNumbers = /^([^0-9]*)$/;

function checkNumber(value: string) {
  if (!containsNoNumbers.test(value)) {
    return 'numberInNameDubious';
  }

  return undefined;
}

export const NameField = () => {
  const { t } = useTranslation();
  const { setCapturePhotoProps, currentPhoto, setFieldValue } = useContext(PatientRegistrationContext);
  const {
    fieldConfigurations: {
      name: {
        displayCapturePhoto,
        allowUnidentifiedPatients,
        defaultUnknownGivenName,
        defaultUnknownFamilyName,
        displayMiddleName,
        displayReverseFieldOrder,
      },
    },
  } = useConfig<RegistrationConfig>();

  const [{ value: isPatientUnknownValue }, , { setValue: setUnknownPatient }] = useField<string>(
    `attributes.${unidentifiedPatientAttributeTypeUuid}`,
  );

  const isPatientUnknown = isPatientUnknownValue === 'true';

  const onCapturePhoto = useCallback(
    (dataUri: string, photoDateTime: string) => {
      if (setCapturePhotoProps) {
        setCapturePhotoProps({
          imageData: dataUri,
          dateTime: photoDateTime,
        });
      }
    },
    [setCapturePhotoProps],
  );

  const toggleNameKnown = (e) => {
    if (e.name === 'known') {
      setFieldValue('givenName', '');
      setFieldValue('familyName', '');
      setUnknownPatient('false');
    } else {
      setFieldValue('givenName', defaultUnknownGivenName);
      setFieldValue('familyName', defaultUnknownFamilyName);
      setUnknownPatient('true');
    }
  };

  const firstNameField = (
    <Column lg={5} md={4} sm={2}>
      <Input
        id="givenName"
        name="givenName"
        labelText={t('givenNameLabelText', 'First Name')}
        checkWarning={checkNumber}
        required
      />
    </Column>
  );

  const middleNameField = displayMiddleName && (
    <Column lg={6} md={4} sm={2}>
      <Input
        id="middleName"
        name="middleName"
        labelText={t('middleNameLabelText', 'Middle Name')}
        checkWarning={checkNumber}
      />
    </Column>
  );

  const familyNameField = (
    <Column lg={5} md={4} sm={2}>
      <Input
        id="familyName"
        name="familyName"
        labelText={t('familyNameLabelText', 'Family Name')}
        checkWarning={checkNumber}
        required
      />
    </Column>
  );

  return (
    <div>
      {/* <h4 className={styles.productiveHeading02Light}>{t('fullNameLabelText', 'Full Name')}</h4> */}
        <Grid>
          {/* {(allowUnidentifiedPatients || isPatientUnknown) && (
            <Column lg={5} md={4} sm={2}>
               <div className={styles.dobContentSwitcherLabel}>
                <span className={styles.label01}>{t('patientNameKnown', "Patient's Name is Known?")}</span>
              </div>
              <ContentSwitcher
                className={styles.contentSwitcher}
                selectedIndex={isPatientUnknown ? 1 : 0}
                onChange={toggleNameKnown}>
                <Switch name="known" text={t('yes', 'Yes')} />
                <Switch name="unknown" text={t('no', 'No')} />
              </ContentSwitcher> 
            </Column>
          )}
          <Column lg={5} md={4} sm={2}></Column> */}
          {/* <Column lg={5} md={4} sm={2}>
             {displayCapturePhoto && (
              <ExtensionSlot
                className={styles.photoExtension}
                name="capture-patient-photo-slot"
                state={{ onCapturePhoto, initialState: currentPhoto }}
              />
            )} 
          </Column> */}
          {!isPatientUnknown &&
            (!displayReverseFieldOrder ? (
              <>
                {firstNameField}
                {middleNameField}
                {familyNameField}
              </>
            ) : (
              <>
                {familyNameField}
                {middleNameField}
                {firstNameField}
              </>
            ))}
        </Grid>
    </div>
  );
};
