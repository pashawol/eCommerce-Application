const AUTH_URL = import.meta.env.VITE_CTP_AUTH_URL
const PROJECT_ID = import.meta.env.VITE_CTP_CLIENT_ID
const PROJECT_SECRET = import.meta.env.VITE_CTP_CLIENT_SECRET

const getAnonymousToken = async () => {
  const authString = btoa(`${PROJECT_ID}:${PROJECT_SECRET}`)

  const response = await fetch(
    `${AUTH_URL}/oauth/ecommerceapplication/anonymous/token?grant_type=client_credentials`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch token')
  }

  const data = await response.json()
  return data.access_token
}
export { getAnonymousToken }
