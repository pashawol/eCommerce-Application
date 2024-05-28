import fetch from 'node-fetch'
import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
  type RefreshAuthMiddlewareOptions
} from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

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

const anonymousAuthMiddleware: AnonymousAuthMiddlewareOptions = {
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET
  },
  host: import.meta.env.VITE_CTP_AUTH_URL,
  fetch
}

function saveTokenSomewhere(token: string) {
  // Здесь реализуйте логику сохранения токена, например в файл или базу данных
  console.log('Токен сохранен:', token)
}

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  // .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  // .withAnonymousSessionFlow(authMiddlewareOptions)
  // .withRefreshTokenFlow(RefreshAuthMiddleware)
  // // .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // Include middleware for logging
  // .build()

  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(anonymousAuthMiddleware)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build()

export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
