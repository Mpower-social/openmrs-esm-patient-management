import { Layer, Select, SelectItem } from '@carbon/react';
import { useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LabelWithRequiredIndicator from '../../../../components/LabelWithRequiredIndicator';

interface SelectInputProps {
  name: string;
  options: Array<string>;
  label: string;
  required?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({ name, options, label, required }) => {
  const [field] = useField(name);
  const { t } = useTranslation();
  const selectOptions = [
    <SelectItem disabled hidden text={`Select ${label}`} key="" value="" />,
    ...options.map((currentOption, index) => <SelectItem text={currentOption} value={currentOption} key={index} />),
  ];

  const labelText = <LabelWithRequiredIndicator text={label} isRequired={required} />;

  return (
    <div style={{ marginBottom: '1rem' }}>
      {/* <Layer> */}
      <Select id="identifier" {...field} labelText={labelText}>
        {selectOptions}
      </Select>
      {/* </Layer> */}
    </div>
  );
};
