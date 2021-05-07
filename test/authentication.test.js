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

  it.skip('generates an authorize URL', () => {
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

  it('can fetch an access token', () => {
    const bundle = {
      inputData: {
        code: '0451cd8b-486e-427b-b5f6-3976e6aeaff8',
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

  it.skip('refreshes the access token', () => {
    /*Check that access token returned is being set in the bundle
    If returning refresh token, make sure it's beting set in the bundle */
    const bundle = {
      authData: {
        refresh_token: '8a56c570-5edb-44c8-915a-cac641bd0cf9'
      },
      environment: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
      }
    }
    return appTester(App.authentication.oauth2Config.refreshAccessToken, bundle)
      .then((result) => {
        should.exist(result.access_token)
        should.exist(result.refresh_token)
      })
  })
})

