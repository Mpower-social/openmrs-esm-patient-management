import { Layer, Select, SelectItem } from '@carbon/react';
import { useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LabelWithRequiredIndicator from '../../../../components/LabelWithRequiredIndicator';

interface SelectInputProps {
  name: string;
  options: Array<{value:string;text:string;}>;
  label: string;
  required?: boolean;
  onChange?:any;
}

export const SelectInput: React.FC<SelectInputProps> = ({ name, options, label, required ,onChange}) => {
  const [field] = useField(name);
  const { t } = useTranslation();
  const selectOptions = [
    <SelectItem disabled hidden text={`Select ${label}`} key="" value="" />,
    ...options.map((currentOption, index) => <SelectItem text={currentOption.text} value={currentOption.value} key={index} />),
  ];

  const labelText = <LabelWithRequiredIndicator text={label} isRequired={required} />;

  return (
    <div style={{ marginBottom: '1rem' }}>
      {/* <Layer> */}
      <Select id="identifier" {...field}  labelText={labelText}>
        {selectOptions}
      </Select>
      {/* </Layer> */}
    </div>
  );
};
