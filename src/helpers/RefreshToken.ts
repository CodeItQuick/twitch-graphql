import axios from 'axios'
import { AuthProvider, StaticAuthProvider } from 'twitch/lib'
import { error } from 'console'
require('dotenv').config()

const client_id = process.env.USER_ID || ''
const client_secret = process.env.SECRET || ''
const refresh_token = process.env.REFRESH_TOKEN || ''

interface IAuthRequest {
  clientId: string
  clientSecret: string
  refreshToken: string
}

export default async ({
  clientId = client_id,
  clientSecret = client_secret,
  refreshToken = refresh_token,
}: IAuthRequest): Promise<AuthProvider> => {
  if (!clientId.length || !clientSecret.length || !refreshToken.length) {
    throw error('env not loading properly')
  }
  const raw = await axios.post(
    `https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`
  )

  const accessToken = raw.data.access_token
  const authProvider: StaticAuthProvider = new StaticAuthProvider(
    clientId,
    accessToken
  )

  return authProvider
}
