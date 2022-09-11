import { AsyncState } from './../../../shared/models'
import DisplayUser from './DisplayUser.interface'
import Jwt from './Jwt.type'

export default interface AuthState extends AsyncState {
  user?: DisplayUser | null
  jwt?: Jwt
  isAuthenticated?: boolean
}
