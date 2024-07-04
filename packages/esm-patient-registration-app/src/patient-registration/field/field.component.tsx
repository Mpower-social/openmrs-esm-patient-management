import { reportError, useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { builtInFields, type RegistrationConfig } from '../../config-schema';
import { AddressLocations } from './address-locations/address-locations';
import { AddressComponent } from './address/address-field.component';
import { CustomField } from './custom-field.component';
import { DobField } from './dob/dob.component';
import { GenderField } from './gender/gender-field.component';
import { Identifiers } from './id/id-field.component';
import { NameField } from './name/name-field.component';
import { OtherInfo } from './other-info/other-info.component';
import { PhoneField } from './phone/phone-field.component';

export interface FieldProps {
  name: string;
}

export function Field({ name }: FieldProps) {
  const config = useConfig() as RegistrationConfig;
  if (
    !(builtInFields as ReadonlyArray<string>).includes(name) &&
    !config.fieldDefinitions.some((def) => def.id == name)
  ) {
    reportError(
      `Invalid field name '${name}'. Valid options are '${config.fieldDefinitions
        .map((def) => def.id)
        .concat(builtInFields)
        .join("', '")}'.`,
    );
    return null;
  }

  switch (name) {
    case 'name':
      return <NameField />;
    case 'gender':
      return <GenderField />;
    case 'dob':
      return <DobField />;
    case 'address':
      return <AddressComponent />;
    case 'locations':
      return <AddressLocations />;
    case 'id':
      return <Identifiers />;
    case 'phone':
      return <PhoneField />;
    case 'otherInfo':
      return <OtherInfo />;
    default:
      return <CustomField name={name} />;
  }
}
