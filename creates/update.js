'use strict'

const perform = (z, bundle) => {
  const url = `https://api.hubapi.com/crm/v3/objects/contacts/${bundle.inputData.email}`
  const options = {
    method: 'PATCH',
    params: {
      idProperty: 'email',
    },
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

  key: 'update_contact',
  noun: 'Contact',
  display: {
    label: 'Update Contact',
    description: 'Updates an existing contact'
  },

  operation: {

    inputFields: [
      {
        key:'lifecyclestage',
        required: false,
        label: 'Lifecycle Stage',
        dynamic: 'lifecyclestage.id.label',
        altersDynamicFields: true
      },

      function (z, bundle) {
        if(bundle.inputData.lifecyclestage === 'lead'){
          return {
            key: 'leadstatus',
            required: false,
            label: 'Lead Status',
            dynamic: 'leadstatus.id.label'
          }
        }
      },
      {
        key: 'company',
        type: 'string',
        label: 'Company',
        required: false
      },
      {
        key: 'email',
        type: 'string',
        label: 'Email',
        required: false
      },
      {
        key: 'firstname',
        type: 'string',
        label: 'First Name',
        required: false
      },
      {
        key: 'lastname',
        type: 'string',
        label: 'Last Name',
        required: false
      },
      {
        key: 'phone',
        type: 'string',
        label: 'Phone Number',
        required: false
      },
      {
        key: 'website',
        type: 'string',
        label: 'Website',
        required: false
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