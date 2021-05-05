'use strict'

const should = require('should')
const zapier = require('zapier-platform-core')

const App = require('../index')
const appTester = zapier.createAppTester(App)
zapier.tools.env.inject()


describe('oauth2 app', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
      throw new Error('For the tests to run, you need to do `export CLIENT_ID=1234 CLIENT_SECRET=asdf`')
    }
  })

  it('generates an authorize URL', () => {
    const bundle = {
      inputData: {
        redirect_uri: 'http://zapier.com'
      },
      environment: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
      }
    }

    return appTester(App.authentication.oauth2Config.authorizeUrl, bundle)
      .then((authorizeUrl) => {
        authorizeUrl.should.eql('https://app.hubspot.com/oauth/authorize?client_id=1234&redirect_uri=http%3A%2F%2Fzapier.com&response_type=code')
      })
  })
})

