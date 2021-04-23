/* eslint-disable no-unused-vars */
/* globals describe, it, expect */
'use strict'

const should = require('should')
const zapier = require('zapier-platform-core')

const App = require('../index')
const appTester = zapier.createAppTester(App)
zapier.tools.env.inject()

describe('My App ', () => {
  it('should find a contact by email', (done) => {
    const bundle = {
      authData: {
        apikey: process.env.APIKEY
      },

      inputData: {
        email: 'jonathan.moore@lefthook.com'
      }
    }

    appTester(App.searches.contact.operation.perform, bundle)
      .then(results => {
        should(results.json.length).eql(1)
        const firstResult = results[0]
        should(firstResult.json.properties.firstname).eql('Jonathan')
        should(firstResult.json.properties.lastname).eql('Moore')
        should(firstResult.json.properties.email).eql('jonathan.moore@lefthook.com')

        done()
      })
      .catch(done)
  })

  it('should not return a 400 when a contact is not found', (done) => {
    const bundle = {
      authData: {
        apikey: process.env.APIKEY
      },
      inputData: {
        email: 'dcmoore19@gmail.com'
      }
    }

    appTester(App.searches.contact.operation.perform, bundle)
      .then(results => {
        const firstResult = results[0]
        should(firstResult.status).below(400)
        done()

      })
      .catch(done)
  })

  it('should create a new contact', (done) => {
    const bundle = {
      authData: {
        apikey: process.env.APIKEY
      },
      inputData: {
        company: 'Town of Normal',
        email: 'dcmoore19@gmail.com',
        firstname: 'Daniel',
        lastname: 'Moore',
        phone: '(309) 824-0469',
        website: 'https://Daniel.moore.com'
      },
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    }

    appTester(App.creates.contact.operation.perform, bundle)
      .then(results => {
        should.exist(results)
        should(results.json.properties.company).eql('Town of Normal')

        done()
      })
      .catch(done)
  })

  it('should update an existing contact', (done) => {
    const bundle = {
      authData: {
        apikey: process.env.APIKEY
      },
      inputData: {
        email: 'andreacraigmoore@gmail.com',
        phone: '(309) 825-7333'
      },
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    }

    appTester(App.creates.update_contact.operation.perform, bundle)
      .then(results => {
        should.exist(results)
        should(results.json.properties.phone).eql('(309) 825-7333')

        done()
      })
      .catch(done)
  })
})
