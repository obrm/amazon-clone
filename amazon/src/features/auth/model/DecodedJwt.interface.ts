import DisplayUser from './DisplayUser.interface';

export default interface DecodedJwt {
  user: DisplayUser
  exp: number
  iat: number
}
