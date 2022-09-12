import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { DisplayUser, NewUser, LoginUser, Jwt, DecodedJwt } from '../model'

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/register`,
    newUser
  )

  return response.data
}

const login = async (user: LoginUser): Promise<Jwt | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login`,
    user
  )

  if (response.data) {
    localStorage.setItem('jwt', JSON.stringify(response.data))

    const decodedJwt: DecodedJwt = jwt_decode(response.data.token)

    localStorage.setItem('user', JSON.stringify(decodedJwt.user))
  }

  return response.data
}

const logout = (): void => {
  localStorage.removeItem('user')
  localStorage.removeItem('jwt')
}

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/verify-jwt`,
    jwt
  )

  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000

    return jwtExpirationMs > Date.now()
  }

  return false
}

const authService = {
  register,
  login,
  logout,
  verifyJwt,
}

export default authService
