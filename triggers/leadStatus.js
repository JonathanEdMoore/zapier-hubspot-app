'use strict'

const perform = (z) => {
  const url = 'https://api.hubapi.com/properties/v1/contacts/properties/named/hs_lead_status'
  return z.request(url).then((response) => {
    let results = []
    for (const options of response.json.options) {
      results.push(
        {
          id: options.value,
          label: options.label
        }
      )
    }
    return results
  })
}

module.exports = {

  key: 'leadstatus',
  noun: 'Lead Status',

  display: {
    label: 'Lead Status',
    description: 'Sets the Lead Status for a Contact.',
    hidden: true
  },

  operation: {
    inputFields: [

    ],

    perform,

    sample: {
      options: [
        {
          
          label: 'New',
          value: 'NEW',
        },
        {
          
          label: 'Open',
          value: 'OPEN',
        },
        {
          
          label: 'In Progress',
          value: 'IN_PROGRESS',
        },
        {
          
          label: 'Open Deal',
          value: 'OPEN_DEAL',
        },
        {
          
          label: 'Unqualified',
          value: 'UNQUALIFIED',
        },
        {
          
          label: 'Working',
          value: 'WORKING',
        },
        {
          label: 'MQL',
          value: 'MQL',
        },
        {
          label: 'Enroll',
          value: 'Enroll',
        },
        {
          label: 'ReEnroll',
          value: 'ReEnroll',
        },
        {
          label: 'Cita',
          value: 'Cita',
        },
        {
          label: 'Asistió',
          value: 'Asistió',
        },
        {
          label: 'No asistió',
          value: 'No asistió',
        },
        {
          label: 'Won',
          value: 'Won',
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