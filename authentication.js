'use strict'
const test = (z, bundle) => {
  let options = {
    url: 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all?count=1',
    header: {
      Authorization: `Bearer ${bundle.authData.access_token}`,
      'content-type': 'application/json'
    }
  }
  let response = z.request(options)
  return response.json
}

const authentication = {
  type: 'oauth2',
  
  test,

  oauth2Config: {
    authorizeUrl: {

      method: 'GET',

      url: 'https://app.hubspot.com/oauth/authorize?',

      params: {
        client_id: '{{process.env.CLIENT_ID}}',

        redirect_uri: 'https://zapier.com/dashboard/auth/oauth/return/App131772CLIAPI/',

        response_type: 'code'     
      }
    },
    getAccessToken: {

      method: 'POST',

      url: 'https://api.hubapi.com/oauth/v1/token',

      body: {
        code: '{{bundle.inputData.code}}',

        client_id: '{{process.env.CLIENT_ID}}',

        client_secret: '{{process.env.CLIENT_SECRET}}',

        redirect_uri: 'https://zapier.com/dashboard/auth/oauth/return/App131772CLIAPI/',

        grant_type: 'authorization_code',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    },
    scope: 'contacts, automation' 
  },
}

const addBearerHeader = (request, z, bundle) => {
  if(bundle.authData && bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`
  }
  return request
}

module.exports = {authentication, addBearerHeader}