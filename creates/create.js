'use strict'

const propertiesFields = (z) => {
  const url = 'https://api.hubapi.com/properties/v1/contacts/properties'
  return z.request(url).then((response) => {
    let results = []
    for (const properties of response.json) {

      if (properties.name === 'lifecyclestage') {
        results.splice(0,0,
          {
            key: properties.name,
            required: false,
            label: properties.label,
            dynamic: 'lifecyclestage.id.label',
            altersDynamicFields: true
          }
        )
      }

      else if (properties.name === 'email') {
        results.splice(0,0,{
          key: properties.name,
          type: 'string',
          label: properties.label,
          required: true
        }
        )
      }

      else if (properties.name !== 'hs_lead_status') {
        results.push(
          {
            key: properties.name,
            type: 'string',
            label: properties.label,
            required: false
          }
        )
      }

    }

    return results
  })
}

const perform = (z, bundle) => {
  const url = 'https://api.hubapi.com/crm/v3/objects/contacts'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: {
      properties: {
        company: bundle.inputData.company,
        email: bundle.inputData.email,
        firstname: bundle.inputData.firstname,
        lastname: bundle.inputData.lastname,
        phone: bundle.inputData.phone,
        website: bundle.inputData.website,
        lifecyclestage: bundle.inputData.lifecyclestage,
        hs_lead_status: bundle.inputData.leadstatus
      }
    },
    json: true
  }
  return z.request(url, options).then((response) => response)
}

module.exports = {

  key: 'contact',
  noun: 'Contact',
  display: {
    label: 'Create Contact',
    description: 'Creates a new contact'
  },

  operation: {

    inputFields: [

      propertiesFields,

      function (z, bundle) {
        if (bundle.inputData.lifecyclestage === 'lead') {
          return {
            key: 'leadstatus',
            required: false,
            label: 'Lead Status',
            dynamic: 'leadstatus.id.label'
          }
        }
      }
    ],
    perform,

    sample: {
      id: 151,
      properties: {
        createdate: '2021-04-19T12:13:10.592Z',
        hs_is_unworked: true,
        hs_marketable_status: false,
        hs_marketable_until_renewal: false,
        lastmodifieddate: '2021-04-19T12:13:10.592Z'
      },
      createdAt: '2021-04-19T12:13:10.592Z',
      updatedAt: '2021-04-19T12:13:10.592Z',
      archived: false
    },

    outputFields: [
      {
        key: 'id',
        label: 'ID'
      },
      {
        key: 'properties',
        label: 'Properties'
      },
      {
        key: 'createdAt',
        label: 'Created At'
      },
      {
        key: 'updatedAt',
        label: 'Updated At'
      },
      {
        key: 'archived',
        label: 'Archived'
      }
    ]
  }
}