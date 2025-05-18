import { Tile } from '@carbon/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { type SectionDefinition } from '../../config-schema';
import styles from '../patient-registration.scss';
import { Section } from './section.component';

export interface SectionWrapperProps {
  sectionDefinition: SectionDefinition;
  index: number;
}

export const SectionWrapper = ({ sectionDefinition, index }: SectionWrapperProps) => {
  const { t } = useTranslation();

  /*
   * This comment exists to provide translation keys for the default section names.
   *
   * DO NOT REMOVE THESE UNLESS A DEFAULT SECTION IS REMOVED
   * t('demographicsSection', 'Basic Info')
   * t('contactSection', 'Contact Details')
   * t('deathSection', 'Death Info')
   * t('relationshipsSection', 'Relationships')
   * t('locationsSection', 'Present Address')
   * t('otherInfoSection', 'Other Information')
   */
  const numberLocalization = (num: number) => {
    let temp = num.toString().split('');
    temp = temp.map((el) => t(el.toString(), el.toString()));
    return temp.join('');
  };

  return (
    <div id={sectionDefinition.id} style={{ scrollMarginTop: '4rem' }}>
      <h3 className={styles.productiveHeading02} style={{ color: '#161616' }}>
        {numberLocalization(index + 1)}. {t(`${sectionDefinition.id}Section`, sectionDefinition.name)}
      </h3>
      {/* <span className={styles.label01}>
        {t('allFieldsRequiredText', 'All fields are required unless marked optional')}
      </span> */}
      <div style={{ margin: '1rem 0 1rem' }}>
        <Tile>
          <Section sectionDefinition={sectionDefinition} />
        </Tile>
      </div>
    </div>
  );
};
