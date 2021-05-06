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

const getAccessToken = (z, bundle) => {
  const promise = z.request(`${process.env.BASE_URL}/oauth/v1/token`, {
    method: 'POST',

    body: {
      code: bundle.inputData.code,
      
      redirect_uri: bundle.inputData.redirect_uri,

      client_id: process.env.CLIENT_ID,

      client_secret: process.env.CLIENT_SECRET,

      grant_type: 'authorization_code'
    },

    headers: {
      accept: 'application/json',

      'content-type': 'application/x-www-form-urlencoded'
    }
  })

  
  return promise.then((response) => {
    if(response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.json)
    }
    
    return {
      access_token: response.json.access_token,
      refresh_token: response.json.refresh_token
    }
  })
}

const refreshAccessToken = (z, bundle) => {
  const promise = z.request(`${process.env.BASE_URL}/oauth/v1/token`, {
    method: 'POST',

    body: {
      refresh_token: bundle.authData.refresh_token,

      client_id: process.env.CLIENT_ID,

      client_secret: process.env.CLIENT_SECRET,

      grant_type: 'refresh_token'
    },
    headers: {
      accept: 'application/json',
      
      'content-type': 'application/x-www-form-urlencoded'
    }
  })

  return promise.then((response) => {
    if(response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.json)
    }

    return{
      access_token: response.json.access_token,
      refresh_token: response.json.refresh_token
    }
  })
}

const authentication = {
  type: 'oauth2',
  
  test,

  oauth2Config: {
    authorizeUrl: {

      url: 'https://app.hubspot.com/oauth/authorize',

      params: {
        client_id: '{{process.env.CLIENT_ID}}',

        redirect_uri: '{{bundle.inputData.redirect_uri}}',

        response_type: 'code'     
      }
    },
    getAccessToken,

    refreshAccessToken,
    
    autoRefresh: true,

    scope: 'contacts' 
  },
}

const addBearerHeader = (request, z, bundle) => {
  if(bundle.authData && bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`
  }
  return request
}

module.exports = {authentication, addBearerHeader}