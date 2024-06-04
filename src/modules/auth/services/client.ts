import fetch from 'node-fetch'
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
  type Middleware,
  type MiddlewareRequest,
  type MiddlewareResponse
} from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { Buffer } from 'buffer'

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY
const scopes = [import.meta.env.VITE_CTP_SCOPES]

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET
  },
  scopes,
  fetch
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch
}

const tokenCache: {
  token: string | null
  expiresAt: number | null
} = {
  token: null,
  expiresAt: null
}

// const tokenCacheMiddleware: Middleware = (next) => async (args: MiddlewareArg, response: MiddlewareResponse) => {
//   const now = Date.now();

//   // Check if the token is cached and not expired
//   if (tokenCache.token && tokenCache.expiresAt && now < tokenCache.expiresAt) {
//     args.request.headers.set('Authorization', `Bearer ${tokenCache.token}`);
//     return next(args, response);
//   }

//   // If the token is not cached or expired, fetch a new one
//   const tokenProvider = new TokenProvider({
//     sdkAuth: args.sdkAuth,
//     fetchTokenInfo: sdkAuth => sdkAuth.anonymousFlow(),
//   });

//   const tokenInfo = await tokenProvider.getTokenInfo();

//   // Cache the new token and its expiry time
//   tokenCache.token = tokenInfo.access_token;
//   tokenCache.expiresAt = now + tokenInfo.expires_in * 1000;

//   args.request.headers.set('Authorization', `Bearer ${tokenCache.token}`);
//   return next(args, response);
// };

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  // .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withPasswordFlow({
    ...authMiddlewareOptions,
    credentials: {
      ...authMiddlewareOptions.credentials,
      user: {
        username: '',
        password: ''
      }
    }
  })
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // Include middleware for logging
  // .withMiddleware(tokenCacheMiddleware)
  .build()

export async function getAccessTokenForUser(userEmail: string, userPassword: string) {
  const authUrl = `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token`
  const scopes = import.meta.env.VITE_CTP_SCOPES
  const authPayload = new URLSearchParams()
  authPayload.append('grant_type', 'client_credentials')
  authPayload.append('username', userEmail)
  authPayload.append('password', userPassword)
  authPayload.append('scope', scopes)

  const authResponse = await fetch(authUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: authPayload
  })

  if (!authResponse.ok) {
    throw new Error(`Authentication failed: ${authResponse.statusText}`)
  }

  const authData = await authResponse.json()
  // console.log('Access token for user:', authData.access_token)
  return authData.access_token
}

export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
