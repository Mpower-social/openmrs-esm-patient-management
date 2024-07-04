import React from 'react';

const LabelWithRequiredIndicator = ({ text, isRequired }) =>
  isRequired ? (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <span>{text}</span>
      <span style={{ color: 'red', fontSize: '1rem' }}> *</span>
    </span>
  ) : (
    text
  );

export default LabelWithRequiredIndicator;
