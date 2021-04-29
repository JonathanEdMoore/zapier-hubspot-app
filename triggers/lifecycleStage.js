/* eslint-disable no-unused-vars */
'use strict'

const perform = (z) => {
  const url = 'https://api.hubapi.com/properties/v1/contacts/properties/named/lifecyclestage'
  return z.request(url).then((response) => {
    let results = []
    for(const options of response.json.options){
      results.push(
        {
          id: options.value,
          label: options.label
        }
      )
    }
    return results
  }
  )
}

module.exports = {

  key: 'lifecyclestage',
  noun: 'Lifecycle Stage',

  display: {
    label: 'Lifecycle Stage',
    description: 'Sets the Lifecycle Stage for a Contact.',
    hidden: true
  },

  operation: {
    inputFields: [

    ],

    perform,

    sample: {
      options: [
        {
          id: 'subscriber',
          label: 'Subscriber',
        },
        {
          id: 'lead',
          label: 'Lead',
        },
        {
          id: 'marketingqualifiedlead',
          label: 'Marketing Qualified Lead', 
        },
        {
          id: 'salesqualifiedlead',
          label: 'Sales Qualified Lead',
          
        },
        {
          id: 'opportunity',
          label: 'Opportunity',
        },
        {
          id: 'customer',
          label: 'Customer',
        },
        {
          id: 'evangelist',
          label: 'Evangelist',
        },
        {
          id: 'other',
          label: 'Other',
        }
      ]
    },
    outputFields: [

      {
        key: 'id',
        label: 'ID'
      },
      {
        key: 'label',
        label: 'Label'
      }
    ]
  }
}