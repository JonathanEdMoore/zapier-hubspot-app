/* eslint-disable no-unused-vars */
'use strict'
const search = require('./searches/search')
const create = require('./creates/create')
const update = require('./creates/update')
const lifecycleStage = require('./triggers/lifecycleStage')
const {authentication, addBearerHeader} = require('./authentication')
const leadStatus = require('./triggers/leadStatus')
const newContact = require('./triggers/newContact')
const updatedContact = require('./triggers/updatedContact')


const throwErrors = (response, z, bundle) => {
  if(response.status === 404){
    /*This seems awkward but I couldn't think of a better way to do it */
    response.status = 200
    response.json = {
      message: 'No person with that email found.'
    }
    return response
  }

  else if(response.status >= 400){
    throw new Error(`Error: ${response.json.message}, Status Code: ${response.status}`)
  }
  
  return response
}


module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,
  

  beforeRequest: [
    addBearerHeader
  ],

  afterResponse: [
    throwErrors
  ],

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [lifecycleStage.key]: lifecycleStage,
    [leadStatus.key]: leadStatus,
    [newContact.key]: newContact,
    [updatedContact.key]: updatedContact
  },

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
