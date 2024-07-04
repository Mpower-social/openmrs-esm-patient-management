import { Type, validator, validators } from '@openmrs/esm-framework';

export interface SectionDefinition {
  id: string;
  name?: string;
  fields: Array<string>;
}

export interface FieldDefinition {
  id: string;
  type: string;
  label?: string;
  uuid: string;
  placeholder?: string;
  dateFormat?: string;
  showHeading: boolean;
  validation?: {
    required: boolean;
    matches?: string;
  };
  answerConceptSetUuid?: string;
  customConceptAnswers?: Array<CustomConceptAnswer>;
}
export interface CustomConceptAnswer {
  uuid: string;
  label?: string;
}
export interface Gender {
  label?: string;
  value: string;
}

export interface RegistrationConfig {
  district: any;
  sections: Array<string>;
  sectionDefinitions: Array<SectionDefinition>;
  fieldDefinitions: Array<FieldDefinition>;
  fieldConfigurations: {
    name: {
      displayMiddleName: boolean;
      allowUnidentifiedPatients: boolean;
      defaultUnknownGivenName: string;
      defaultUnknownFamilyName: string;
      displayCapturePhoto: boolean;
      displayReverseFieldOrder: boolean;
    };
    gender: Array<Gender>;
    address: {
      useAddressHierarchy: {
        enabled: boolean;
        useQuickSearch: boolean;
        searchAddressByLevel: boolean;
      };
    };
    dateOfBirth: {
      allowEstimatedDateOfBirth: boolean;
      useEstimatedDateOfBirth: {
        enabled: boolean;
        dayOfMonth: number;
        month: number;
      };
    };
    phone: {
      personAttributeUuid: string;
      validation?: {
        required: boolean;
        matches?: string;
      };
    };
    nid: {
      personAttributeUuid: string;
    };
    division: {
      personAttributeUuid: string;
    };
    divisionId: {
      personAttributeUuid: string;
    };
    district: {
      personAttributeUuid: string;
    };
    districtId: {
      personAttributeUuid: string;
    };
    upazila: {
      personAttributeUuid: string;
    };
    upazilaId: {
      personAttributeUuid: string;
    };
    paurashava: {
      personAttributeUuid: string;
    };
    paurashavaId: {
      personAttributeUuid: string;
    };
    union: {
      personAttributeUuid: string;
    };
    unionId: {
      personAttributeUuid: string;
    };
    ward: {
      personAttributeUuid: string;
    };
    wardId: {
      personAttributeUuid: string;
    };
    patientAddress: {
      personAttributeUuid: string;
    };

    brn: {
      personAttributeUuid: string;
    };
    uid: {
      personAttributeUuid: string;
    };
    fullNameBangla: {
      personAttributeUuid: string;
    };
    motherName: {
      personAttributeUuid: string;
    };
    motherNameBangla: {
      personAttributeUuid: string;
    };
    motherUID: {
      personAttributeUuid: string;
    };
    fatherNameBangla: {
      personAttributeUuid: string;
    };
    fatherNameEnglish: {
      personAttributeUuid: string;
    };
    fatherUID: {
      personAttributeUuid: string;
    };
    birthPlace: {
      personAttributeUuid: string;
    };
    nationality: {
      personAttributeUuid: string;
    };
    religion: {
      personAttributeUuid: string;
    };
    occupation: {
      personAttributeUuid: string;
    };
    bloodGroup: {
      personAttributeUuid: string;
    };
    eduQualification: {
      personAttributeUuid: string;
    };
    maritalStatus: {
      personAttributeUuid: string;
    };
    spouseNameBangla: {
      personAttributeUuid: string;
    };
    spouseNameEnglish: {
      personAttributeUuid: string;
    };
    spouseUID: {
      personAttributeUuid: string;
    };
    disabilityType: {
      personAttributeUuid: string;
    };
    ethnicity: {
      personAttributeUuid: string;
    };
    biometricID: {
      personAttributeUuid: string;
    };
  };
  links: {
    submitButton: string;
  };
  defaultPatientIdentifierTypes: Array<string>;
  registrationObs: {
    encounterTypeUuid: string | null;
    encounterProviderRoleUuid: string;
    registrationFormUuid: string | null;
  };
}

export const builtInSections: Array<SectionDefinition> = [
  {
    id: 'demographics',
    name: 'Basic Info',
    fields: ['name', 'dob', 'id'],
  },
  // { id: "contact", name: "Contact Details", fields: ["address"] },
  { id: 'locations', name: 'Location Details', fields: ['locations'] },
  { id: 'otherInfo', name: 'Other Information', fields: ['otherInfo'] },
  { id: 'death', name: 'Death Info', fields: [] },
];

// These fields are handled specially in field.component.tsx
export const builtInFields = [
  'name',
  'gender',
  'dob',
  'id',
  // "address",
  'locations',
  'phone',
  'otherInfo',
] as const;

export const esmPatientRegistrationSchema = {
  sections: {
    _type: Type.Array,
    _default: ['demographics', 'contact', 'relationships', 'locations', 'otherInfo'],
    _description: `An array of strings which are the keys from 'sectionDefinitions' or any of the following built-in sections: '${builtInSections
      .map((s) => s.id)
      .join("', '")}'.`,
    _elements: {
      _type: Type.String,
    },
  },
  sectionDefinitions: {
    _type: Type.Array,
    _elements: {
      id: {
        _type: Type.String,
        _description: `How this section will be referred to in the \`sections\` configuration. To override a built-in section, use that section's id. The built in section ids are '${builtInSections
          .map((s) => s.id)
          .join("', '")}'.`,
      },
      name: {
        _type: Type.String,
        _description: 'The title to display at the top of the section.',
      },
      fields: {
        _type: Type.Array,
        _default: [],
        _description: `The parts to include in the section. Can be any of the following built-in fields: ${builtInFields.join(
          ', ',
        )}. Can also be an id from an object in the \`fieldDefinitions\` array, which you can use to define custom fields.`,
        _elements: { _type: Type.String },
      },
    },
    _default: [],
  },
  fieldDefinitions: {
    _type: Type.Array,
    _elements: {
      id: {
        _type: Type.String,
        _description:
          'How this field will be referred to in the `fields` element of the `sectionDefinitions` configuration.',
      },
      type: {
        _type: Type.String,
        _description: "How this field's data will be stored—a person attribute or an obs.",
        _validators: [validators.oneOf(['person attribute', 'obs'])],
      },
      uuid: {
        _type: Type.UUID,
        _description: "Person attribute type UUID that this field's data should be saved to.",
      },
      showHeading: {
        _type: Type.Boolean,
        _description: 'Whether to show a heading above the person attribute field.',
        _default: false,
      },
      label: {
        _type: Type.String,
        _default: null,
        _description: 'The label of the input. By default, uses the metadata `display` attribute.',
      },
      placeholder: {
        _type: Type.String,
        _default: '',
        _description: 'Placeholder that will appear in the input.',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
      answerConceptSetUuid: {
        _type: Type.ConceptUuid,
        _default: null,
        _description:
          'For coded questions only. A concept which has the possible responses either as answers or as set members.',
      },
      customConceptAnswers: {
        _type: Type.Array,
        _elements: {
          uuid: {
            _type: Type.UUID,
            _description: 'Answer concept UUID',
          },
          label: {
            _type: Type.String,
            _default: null,
            _description: 'The custom label for the answer concept.',
          },
        },
        _default: [],
        _description:
          'For coded questions only (obs or person attrbute). A list of custom concept answers. Overrides answers that come from the obs concept or from `answerSetConceptUuid`.',
      },
    },
    // Do not add fields here. If you want to add a field in code, add it to built-in fields above.
    _default: [],
    _description:
      'Definitions for custom fields that can be used in sectionDefinitions. Can also be used to override built-in fields.',
  },
  fieldConfigurations: {
    name: {
      displayMiddleName: { _type: Type.Boolean, _default: true },
      allowUnidentifiedPatients: {
        _type: Type.Boolean,
        _default: true,
        _description: 'Whether to allow registering unidentified patients.',
      },
      defaultUnknownGivenName: {
        _type: Type.String,
        _default: 'UNKNOWN',
        _description: 'The given/first name to record for unidentified patients.',
      },
      defaultUnknownFamilyName: {
        _type: Type.String,
        _default: 'UNKNOWN',
        _description: 'The family/last name to record for unidentified patients.',
      },
      displayCapturePhoto: {
        _type: Type.Boolean,
        _default: true,
        _description: 'Whether to display capture patient photo slot on name field',
      },
      displayReverseFieldOrder: {
        _type: Type.Boolean,
        _default: false,
        _description: "Whether to display the name fields in the order 'Family name' -> 'Middle name' -> 'First name'",
      },
    },
    gender: {
      _type: Type.Array,
      _elements: {
        value: {
          _type: Type.String,
          _description:
            'Value that will be sent to the server. Limited to FHIR-supported values for Administrative Gender',
          _validators: [validators.oneOf(['male', 'female', 'other', 'unknown'])],
        },
        label: {
          _type: Type.String,
          _default: null,
          _description:
            'The label displayed for the sex option, if it should be different from the value (the value will be translated; the English "translation" is upper-case).',
        },
      },
      _default: [
        {
          value: 'male',
        },
        {
          value: 'female',
        },
        {
          value: 'other',
        },
        {
          value: 'unknown',
        },
      ],
      _description:
        'The options for sex selection during patient registration. This is Administrative Gender as it is called by FHIR (Possible options are limited to those defined in FHIR Administrative Gender, see https://hl7.org/fhir/R4/valueset-administrative-gender.html).',
    },
    address: {
      useAddressHierarchy: {
        enabled: {
          _type: Type.Boolean,
          _description: 'Whether to use the Address hierarchy in the registration form or not',
          _default: true,
        },
        useQuickSearch: {
          _type: Type.Boolean,
          _description:
            'Whether to use the quick searching through the address saved in the database pre-fill the form.',
          _default: true,
        },
        searchAddressByLevel: {
          _type: Type.Boolean,
          _description:
            "Whether to fill the addresses by levels, i.e. County => subCounty, the current field is dependent on it's previous field.",
          _default: false,
        },
        useAddressHierarchyLabel: {
          _type: Type.Object,
          _description: 'Whether to use custom labels for address hierarchy',
          _default: {},
        },
      },
    },
    dateOfBirth: {
      allowEstimatedDateOfBirth: {
        _type: Type.Boolean,
        _description: 'Whether to allow estimated date of birth for a patient during registration',
        _default: true,
      },
      useEstimatedDateOfBirth: {
        enabled: {
          _type: Type.Boolean,
          _description: 'Whether to use a fixed day and month for estimated date of birth',
          _default: false,
        },
        dayOfMonth: {
          _type: Type.Number,
          _description: 'The custom day of the month use on the estimated date of birth',
          _default: 0,
        },
        month: {
          _type: Type.Number,
          _description: 'The custom month to use on the estimated date of birth i.e 0 = Jan & 11 = Dec',
          _default: 0,
        },
      },
    },
    phone: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '14d4f066-15f5-102d-96e4-000c29c2a5d7',
        _description: 'The UUID of the phone number person attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    nid: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '041dcab7-ac07-41aa-928a-1f13e7c65c34',
        _description: 'The UUID of the nid attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    division: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'f737da5f-d684-4eb8-884e-984e4c62cc0d',
        _description: 'The UUID of the division attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: true },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    divisionId: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '88f38dba-248f-428b-bbde-64096346bc65',
        _description: 'The UUID of the divisionId attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    district: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '836bbd5c-7794-4716-97d7-a3a61ebed982',
        _description: 'The UUID of the district attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: true },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    districtId: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '88bee94d-3b21-4412-a3f0-a638b5d50134',
        _description: 'The UUID of the districtId attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    upazila: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '29aeb2b3-5b6d-45b1-a8c1-307ca7e6167a',
        _description: 'The UUID of the upazila attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: true },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    upazilaId: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '35f6cd31-02e2-4d7e-a55d-9a0e70239c18',
        _description: 'The UUID of the upazilaId attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    paurashava: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'a1f2cd6f-f76b-460f-b1a2-e5fc4b759387',
        _description: 'The UUID of the 	paurashava attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: true },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    paurashavaId: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '3af2cba5-1495-4629-97cd-7546014107cf',
        _description: 'The UUID of the 	paurashavaId attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    union: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '5d6ac3dd-1ac9-41b6-ae0a-e8a85a97a21c',
        _description: 'The UUID of the 	union attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: true },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    unionId: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'd04dc189-5826-4f0d-9df5-838f35dbd0f6',
        _description: 'The UUID of the 	unionId attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    ward: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '59daac4e-635b-43f1-a3c2-4000a70ec75e',
        _description: 'The UUID of the 	ward attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: true },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    wardId: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'e51c7415-0206-464e-9c79-b00fa847bc46',
        _description: 'The UUID of the 	wardId attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    patientAddress: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'b7a0bb2e-74b9-4236-8b3d-f403cd53b32b',
        _description: 'The UUID of the 	patientAddress attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: true },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    brn: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '0c198a6f-4a16-4398-92b6-57e5beee695f',
        _description: 'The UUID of the brn attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    uid: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '366d2f39-c426-498a-82a9-eb19b4dcbb01',
        _description: 'The UUID of the uid attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    fullNameBangla: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'c9aaba5b-9227-4e30-8067-a6c1f15b0174',
        _description: 'The UUID of the full name in Bangla attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    motherName: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '87a689e1-41cc-41ce-a25e-d3c584673dce',
        _description: 'The UUID of the mother name attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    motherNameBangla: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '20bdcfd2-c58f-4552-a002-56ceb605c288',
        _description: 'The UUID of the mother name in Bangla attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    motherUID: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'bd781846-ffd0-47af-829b-b54a7ae70b71',
        _description: 'The UUID of the mother UID attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    fatherNameBangla: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '25819ba8-6126-48f3-b8f0-d31960c31e65',
        _description: 'The UUID of the father name in Bangla attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    fatherNameEnglish: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '2b8051e6-3c2d-45b5-ac92-2db429a97edb',
        _description: 'The UUID of the father name in English attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    fatherUID: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'c92e994b-c4ce-4653-b6d3-69bbc94cc518',
        _description: 'The UUID of the father UID attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    birthPlace: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '8d8718c2-c2cc-11de-8d13-0010c6dffd0f',
        _description: 'The UUID of the birth place attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    nationality: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '26ad0d0b-d6c3-4c78-a4b7-4d4e04bc9e86',
        _description: 'The UUID of the nationality attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    religion: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '90d733c2-c50c-4f80-9d62-da402af62ea1',
        _description: 'The UUID of the religion attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    occupation: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '5d9e809a-d9c8-4b41-8c0d-27e6c92c20b4',
        _description: 'The UUID of the occupation attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    bloodGroup: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '2cdc9da4-4d56-40e8-bb5f-972f61ab89d7',
        _description: 'The UUID of the blood group attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    eduQualification: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'e613034f-a9e4-4740-a915-7a50c8c31f77',
        _description: 'The UUID of the education qualification attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    maritalStatus: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '9c161cbb-9508-435c-b256-23af971dff87',
        _description: 'The UUID of the marital status attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    spouseNameBangla: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'dc3bf479-42c2-4863-8808-669c02a2302d',
        _description: 'The UUID of the spouse name in Bangla attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    spouseNameEnglish: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '9553449b-2d33-4e25-89a1-3dcc66a309e3',
        _description: 'The UUID of the spouse name in English attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    spouseUID: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'eb802da0-b8b8-40b2-b8c5-244bf5bedf99',
        _description: 'The UUID of the spouse UID attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    disabilityType: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '8263c039-e758-4d2f-9064-e57a660a3705',
        _description: 'The UUID of the disability type attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    ethnicity: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: 'e5f3c903-ef1e-4f6a-a5b5-e4e6676875fe',
        _description: 'The UUID of the ethnicity attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
    biometricID: {
      personAttributeUuid: {
        _type: Type.UUID,
        _default: '31aea434-ed82-4f58-93ff-8c24703f0a07',
        _description: 'The UUID of the biometricID attribute type',
      },
      validation: {
        required: { _type: Type.Boolean, _default: false },
        matches: {
          _type: Type.String,
          _default: null,
          _description: 'Optional RegEx for testing the validity of the input.',
        },
      },
    },
  },
  links: {
    submitButton: {
      _type: Type.String,
      _default: '${openmrsSpaBase}/home/member-profile?id=${patientUuid}',
      _validators: [validators.isUrlWithTemplateParameters(['patientUuid'])],
    },
  },
  defaultPatientIdentifierTypes: {
    _type: Type.Array,
    _elements: {
      _type: Type.PatientIdentifierTypeUuid,
    },
    _default: [],
  },
  registrationObs: {
    encounterTypeUuid: {
      _type: Type.UUID,
      _default: null,
      _description:
        'Obs created during registration will be associated with an encounter of this type. This must be set in order to use fields of type `obs`.',
    },
    encounterProviderRoleUuid: {
      _type: Type.UUID,
      _default: 'a0b03050-c99b-11e0-9572-0800200c9a66',
      _description: "The provider role to use for the registration encounter. Default is 'Unkown'.",
    },
    registrationFormUuid: {
      _type: Type.UUID,
      _default: null,
      _description:
        'The form UUID to associate with the registration encounter. By default no form will be associated.',
    },
  },
  _validators: [
    validator(
      (config: RegistrationConfig) =>
        !config.fieldDefinitions.some((d) => d.type == 'obs') || config.registrationObs.encounterTypeUuid != null,
      "If fieldDefinitions contains any fields of type 'obs', `registrationObs.encounterTypeUuid` must be specified.",
    ),
    validator(
      (config: RegistrationConfig) =>
        config.sections.every((s) =>
          [...builtInSections, ...config.sectionDefinitions].map((sDef) => sDef.id).includes(s),
        ),
      (config: RegistrationConfig) => {
        const allowedSections = [...builtInSections, ...config.sectionDefinitions].map((sDef) => sDef.id);
        const badSection = config.sections.find((s) => !allowedSections.includes(s));
        return (
          `'${badSection}' is not a valid section ID. Valid section IDs include the built-in sections ${stringifyDefinitions(
            builtInSections,
          )}` +
          (config.sectionDefinitions.length
            ? `; and the defined sections ${stringifyDefinitions(config.sectionDefinitions)}.`
            : '.')
        );
      },
    ),
    validator(
      (config: RegistrationConfig) =>
        config.sectionDefinitions.every((sectionDefinition) =>
          sectionDefinition.fields.every((f) =>
            [...builtInFields, ...config.fieldDefinitions.map((fDef) => fDef.id)].includes(f),
          ),
        ),
      (config: RegistrationConfig) => {
        const allowedFields = [...builtInFields, ...config.fieldDefinitions.map((fDef) => fDef.id)];
        const badSection = config.sectionDefinitions.find((sectionDefinition) =>
          sectionDefinition.fields.some((f) => !allowedFields.includes(f)),
        );
        const badField = badSection.fields.find((f) => !allowedFields.includes(f));
        return (
          `The section definition '${
            badSection.id
          }' contains an invalid field '${badField}'. 'fields' can only contain the built-in fields '${builtInFields.join(
            "', '",
          )}'` +
          (config.fieldDefinitions.length
            ? `; or the defined fields ${stringifyDefinitions(config.fieldDefinitions)}.`
            : '.')
        );
      },
    ),
  ],
};

function stringifyDefinitions(sectionDefinitions: Array<SectionDefinition | FieldDefinition>) {
  return `'${sectionDefinitions.map((s) => s.id).join("', '")}'`;
}
