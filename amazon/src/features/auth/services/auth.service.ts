import axios from 'axios'

import { DisplayUser, NewUser } from './../model'

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/register`,
    newUser
  )

  return response.data
}

const authService = {
  register,
  // login,
  // logout,
  // verifyJwt,
}

export default authService
