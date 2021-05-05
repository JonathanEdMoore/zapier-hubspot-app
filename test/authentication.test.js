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
        redirect_uri: 'https://localhost/3000/'
      },
      environment: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
      }
    }

    return appTester(App.authentication.oauth2Config.authorizeUrl, bundle)
      .then((authorizeUrl) => {
        authorizeUrl.should.eql('https://app.hubspot.com/oauth/authorize?client_id=4ade109d-04b3-44b8-b520-9b68b00841a0&redirect_uri=https%3A%2F%2Flocalhost%2F3000%2F&response_type=code')
      })
  })

  it.skip('can fetch an access token', () => {
    const bundle = {
      inputData: {
        code: 'b8832d00-cda4-4d53-8d8c-93daa2c17f75',
        redirect_uri: 'http://localhost/3000/'
      },
      environment: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
      },

    }

    return appTester(App.authentication.oauth2Config.getAccessToken, bundle)
      .then((result) => {
        should.exist(result.access_token)
        should.exist(result.refresh_token)
      })
  })
})

