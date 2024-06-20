let temp = {
  uuid: '0004193e-cd74-46c1-9620-c21a69da2ac6',
  display: '10002T8 - Jeremy Xaviera Howard Andrew Duke',
  identifiers: [
    {
      uuid: '29720ccd-ee45-4447-afed-1b80b8d99d2b',
      display: 'OpenMRS ID = 10002T8',
      links: [
        {
          rel: 'self',
          uri: 'http://openmrs-o3.mpower-social.com/openmrs/ws/rest/v1/patient/0004193e-cd74-46c1-9620-c21a69da2ac6/identifier/29720ccd-ee45-4447-afed-1b80b8d99d2b',
          resourceAlias: 'identifier',
        },
      ],
    },
  ],
  person: {
    uuid: '0004193e-cd74-46c1-9620-c21a69da2ac6',
    display: 'Jeremy Xaviera Howard Andrew Duke',
    gender: 'O',
    age: 0,
    birthdate: '2024-06-04T00:00:00.000+0000',
    birthdateEstimated: false,
    dead: false,
    deathDate: null,
    causeOfDeath: null,
    preferredName: {
      uuid: '47426237-65af-4c96-bb34-26e693956b04',
      display: 'Jeremy Xaviera Howard Andrew Duke',
      links: [
        {
          rel: 'self',
          uri: 'http://openmrs-o3.mpower-social.com/openmrs/ws/rest/v1/person/0004193e-cd74-46c1-9620-c21a69da2ac6/name/47426237-65af-4c96-bb34-26e693956b04',
          resourceAlias: 'name',
        },
      ],
    },
    preferredAddress: {
      uuid: '3ab6712a-8944-4865-876e-b7fc2c559923',
      display: '61 North Oak Avenue',
      links: [
        {
          rel: 'self',
          uri: 'http://openmrs-o3.mpower-social.com/openmrs/ws/rest/v1/person/0004193e-cd74-46c1-9620-c21a69da2ac6/address/3ab6712a-8944-4865-876e-b7fc2c559923',
          resourceAlias: 'address',
        },
      ],
    },
    attributes: [
      {
        uuid: '5755a3e0-c168-44b7-9a7d-5a6b87de44ad',
        display: 'telephoneNumber = +1 (139) 663-2232',
        links: [
          {
            rel: 'self',
            uri: 'http://openmrs-o3.mpower-social.com/openmrs/ws/rest/v1/person/0004193e-cd74-46c1-9620-c21a69da2ac6/attribute/5755a3e0-c168-44b7-9a7d-5a6b87de44ad',
            resourceAlias: 'attribute',
          },
        ],
      },
    ],
    voided: false,
    birthtime: null,
    deathdateEstimated: false,
    links: [
      {
        rel: 'self',
        uri: 'http://openmrs-o3.mpower-social.com/openmrs/ws/rest/v1/person/0004193e-cd74-46c1-9620-c21a69da2ac6',
        resourceAlias: 'person',
      },
      {
        rel: 'full',
        uri: 'http://openmrs-o3.mpower-social.com/openmrs/ws/rest/v1/person/0004193e-cd74-46c1-9620-c21a69da2ac6?v=full',
        resourceAlias: 'person',
      },
    ],
    resourceVersion: '1.11',
  },
  voided: false,
  links: [
    {
      rel: 'self',
      uri: 'http://openmrs-o3.mpower-social.com/openmrs/ws/rest/v1/patient/0004193e-cd74-46c1-9620-c21a69da2ac6',
      resourceAlias: 'patient',
    },
    {
      rel: 'full',
      uri: 'http://openmrs-o3.mpower-social.com/openmrs/ws/rest/v1/patient/0004193e-cd74-46c1-9620-c21a69da2ac6?v=full',
      resourceAlias: 'patient',
    },
  ],
  resourceVersion: '1.8',
};

temp = temp.person;
let tempAttributes = temp.attributes.map((el) => {
  return {
    [el.display.split('=')[0]]: el.display.split('=')[1],
  };
});
