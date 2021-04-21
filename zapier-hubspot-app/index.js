/* eslint-disable no-unused-vars */
'use strict'
const search = require('./searches/search')
const create = require('./creates/create')
const update = require('./creates/update')


const addApiKeytoParams = (request, z, bundle) => {
  request.params['hapikey'] = bundle.authData.apikey 
  return request
}

const throwErrors = (response, z, bundle) => {
  if(response.status >=400){
    throw new Error(`Error: ${response.json.message}, Status Code: ${response.status}`)
  }
  return response
}


module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication:  {
    type: 'custom',
    fields: [
      {
        key: 'apikey',
        type: 'string'
      }
    ],
    test: (z, bundle) => {
      const promise = z.request('https://api.hubapi.com/crm/v3/objects/contacts')
      return promise.then((response) => {
        if(response.status !== 200) {
          throw new Error('Invalid API Key')
        }
      })
    }
  },
  

  beforeRequest: [
    addApiKeytoParams
  ],

  afterResponse: [
    throwErrors
  ],

  // If you want your trigger to show up, you better include it here!
  triggers: {},

  // If you want your searches to show up, you better include it here!
  searches: {
    [search.key]: search
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [create.key]: create,
    [update.key]: update
  },

  resources: {},
};
