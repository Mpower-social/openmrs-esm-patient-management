import React, { type ChangeEvent, useCallback, useContext } from 'react';
import { ContentSwitcher, DatePicker, DatePickerInput, Layer, Switch, TextInput, Grid, Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { generateFormatting } from '../../date-util';
import { PatientRegistrationContext } from '../../patient-registration-context';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';
import styles from '../field.scss';

const calcBirthdate = (yearDelta, monthDelta, dateOfBirth) => {
  const { enabled, month, dayOfMonth } = dateOfBirth.useEstimatedDateOfBirth;
  const startDate = new Date();
  const resultMonth = new Date(startDate.getFullYear() - yearDelta, startDate.getMonth() - monthDelta, 1);
  const daysInResultMonth = new Date(resultMonth.getFullYear(), resultMonth.getMonth() + 1, 0).getDate();
  const resultDate = new Date(
    resultMonth.getFullYear(),
    resultMonth.getMonth(),
    Math.min(startDate.getDate(), daysInResultMonth),
  );
  return enabled ? new Date(resultDate.getFullYear(), month, dayOfMonth) : resultDate;
};

export const DobField: React.FC = () => {
  const { t } = useTranslation();
  const {
    fieldConfigurations: { dateOfBirth },
  } = useConfig<RegistrationConfig>();
  const allowEstimatedBirthDate = dateOfBirth?.allowEstimatedDateOfBirth;
  const [{ value: dobUnknown }] = useField('birthdateEstimated');
  const [birthdate, birthdateMeta] = useField('birthdate');
  const [yearsEstimated, yearsEstimateMeta] = useField('yearsEstimated');
  const [monthsEstimated, monthsEstimateMeta] = useField('monthsEstimated');
  const { setFieldValue, values } = useContext(PatientRegistrationContext);
  const { format, placeHolder, dateFormat } = generateFormatting(['d', 'm', 'Y'], '/');
  const today = new Date();

  const onToggle = useCallback(
    (e: { name?: string | number }) => {
      setFieldValue('birthdateEstimated', e.name === 'unknown');
      setFieldValue('birthdate', '');
      setFieldValue('yearsEstimated', 0);
      setFieldValue('monthsEstimated', '');
    },
    [setFieldValue],
  );

  const onDateChange = useCallback(
    (birthdate: Date[]) => {
      setFieldValue('birthdate', birthdate[0]);
    },
    [setFieldValue],
  );

  const onEstimatedYearsChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const years = +ev.target.value;

      if (!isNaN(years) && years < 140 && years >= 0) {
        setFieldValue('yearsEstimated', years);
        setFieldValue('birthdate', calcBirthdate(years, monthsEstimateMeta.value, dateOfBirth));
      }
    },
    [setFieldValue, dateOfBirth, monthsEstimateMeta.value],
  );

  const onEstimatedMonthsChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const months = +ev.target.value;

      if (!isNaN(months)) {
        setFieldValue('monthsEstimated', months);
        setFieldValue('birthdate', calcBirthdate(yearsEstimateMeta.value, months, dateOfBirth));
      }
    },
    [setFieldValue, dateOfBirth, yearsEstimateMeta.value],
  );

  const updateBirthdate = useCallback(() => {
    const months = +monthsEstimateMeta.value % 12;
    const years = +yearsEstimateMeta.value + Math.floor(monthsEstimateMeta.value / 12);
    setFieldValue('yearsEstimated', years);
    setFieldValue('monthsEstimated', months > 0 ? months : '');
    setFieldValue('birthdate', calcBirthdate(years, months, dateOfBirth));
  }, [setFieldValue, monthsEstimateMeta, yearsEstimateMeta, dateOfBirth]);

  return (
    <div>
      {/* <h4 className={styles.productiveHeading02Light}>{t('birthFieldLabelText', 'Birth')}</h4> */}
      <Grid>
        <Column lg={5} md={4} sm={2}>
          {(allowEstimatedBirthDate || dobUnknown) && (
            <div>
              <div className={styles.dobContentSwitcherLabel}>
                <span className={styles.label01}>{t('dobToggleLabelText', 'Date of Birth Known?')}</span>
              </div>
              <ContentSwitcher onChange={onToggle} selectedIndex={dobUnknown ? 1 : 0}>
                <Switch name="known" text={t('yes', 'Yes')} />
                <Switch name="unknown" text={t('no', 'No')} />
              </ContentSwitcher>
            </div>
          )}
        </Column>
        {/* <Layer> */}
        
        {!dobUnknown ? (
          <Column lg={5} md={5} sm={2} style={{ marginTop: '10px' }}>
            <DatePicker dateFormat={dateFormat} datePickerType="single" onChange={onDateChange} maxDate={format(today)}>
              <DatePickerInput
                id="birthdate"
                {...birthdate}
                size="sm"
                placeholder={placeHolder}
                labelText={t('dateOfBirthLabelText', 'Date of Birth')}
                invalid={!!(birthdateMeta.touched && birthdateMeta.error)}
                invalidText={birthdateMeta.error && t(birthdateMeta.error)}
                value={format(birthdate.value)}
              />
            </DatePicker>
          </Column>
        ) : (
          <>
            <Column lg={6} md={5} sm={4} style={{ marginTop: '10px' }}>
              {/* <div className={styles.dobField}> */}
              {/* <Layer> */}
              <TextInput
                size="sm"
                id="yearsEstimated"
                type="number"
                name={yearsEstimated.name}
                onChange={onEstimatedYearsChange}
                labelText={t('estimatedAgeInYearsLabelText', 'Estimated age in years')}
                invalid={!!(yearsEstimateMeta.touched && yearsEstimateMeta.error)}
                invalidText={yearsEstimateMeta.error && t(yearsEstimateMeta.error)}
                value={yearsEstimated.value}
                min={0}
                required
                {...yearsEstimated}
                onBlur={updateBirthdate}
              />
              {/* </Layer> */}
              {/* </div> */}
            </Column>
            <Column lg={5} md={5} sm={4} style={{ marginTop: '10px' }}>
              {/* <div className={styles.dobField}> */}
              {/* <Layer> */}
              <TextInput
                size="sm"
                id="monthsEstimated"
                type="number"
                name={monthsEstimated.name}
                onChange={onEstimatedMonthsChange}
                labelText={t('estimatedAgeInMonthsLabelText', 'Estimated age in months')}
                invalid={!!(monthsEstimateMeta.touched && monthsEstimateMeta.error)}
                invalidText={monthsEstimateMeta.error && t(monthsEstimateMeta.error)}
                value={monthsEstimated.value}
                min={0}
                {...monthsEstimated}
                required={!yearsEstimateMeta.value}
                onBlur={updateBirthdate}
              />
              {/* </Layer> */}
              {/* </div> */}
            </Column>
          </>
        )}
        {/* </Layer> */}
      </Grid>
    </div>
  );
};
