/* eslint-disable quotes */
'use strict'

const perform = (z, bundle) => {
  const url = `https://api.hubapi.com/crm/v3/objects/contacts/${bundle.inputData.email}`
  const options = {
    method: 'GET', //default method, but included to be thorough
    params: {
      idProperty: 'email',
      archived: 'false',
    },
    headers: {
      accept: 'application/json'
    }
  }
  return z.request(url, options).then((response) => [response] /*Update this to handle error response*/)
}


module.exports = {

  key: 'contact',
  noun: 'Contact',
  display: {
    label: 'Find a Contact',
    description: 'Search for contact by email'
  },

  operation: {
    inputFields: [
      {
        key: 'email',
        type: 'string',
        label: 'Email',
        required: true
      }
    ],
    
    perform,


    sample: {
      
      id: 51,
      properties: {
        createdate: "2021-04-16T17:00:53.811Z",
        email: "bh@hubspot.com",
        firstname: "Brian",
        hs_object_id: "51",
        lastmodifieddate: "2021-04-16T17:00:57.808Z",
        lastname: "Halligan (Sample Contact)"
      },
      createdAt: "2021-04-16T17:00:53.811Z",
      updatedAt: "2021-04-16T17:00:57.808Z",
      archived: false
      
    }
  },

}