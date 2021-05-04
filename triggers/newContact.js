'use strict'

const perform = (z) => {
  const url = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all'
  return z.request(url).then((response) => {
    let results = []
    for(const contacts of response.json.contacts){
      contacts.id = contacts.vid
      results.push(
        contacts
      )
    }
    return results
  })
}

module.exports = {
  key: 'contact',
  noun: 'Contact',
  display: {
    label: 'New Contact',
    description: 'Trigger when a new contact is added.'
  },
  operation: {
    perform,
    sample: {
      contacts: [
        {
          id: 1,
          addedAt: 1618592453746,
          vid: 1,
          'canonical-vid': 1,
          'merged-vids': [],
          'portal-id': 19885895,
          'is-contact': true,
          properties: {
            firstname: {
              value: 'Maria'
            },
            lastmodifieddate: {
              value: 1618592457289
            },
            company: {
              value: 'HubSpot'
            },
            lastname: {
              value: 'Johnson (Sample Contact)'
            }
          },
          'form-submissions': [],
          'identity-profiles': [
            {
              vid: 1,
              'saved-at-timestamp': 1618592453489,
              'deleted-changed-timestamp': 0,
              identities: [
                {
                  type: 'EMAIL',
                  value: 'emailmaria@hubspot.com',
                  timestamp: 1618592453427,
                  'is-primary': true
                },
                {
                  type: 'LEAD_GUID',
                  value: '24b8b9ba-763b-4bb3-82da-ae4d8a2d1afc',
                  timestamp: 1618592453485
                }
              ]
            }
          ],
          'merge-audits': []
        }
      ]
    }
  }
}