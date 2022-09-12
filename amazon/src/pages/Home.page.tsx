/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout } from '../features/auth/authSlice';

const HomePage = () => {

  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return <div>
    <h1>home page</h1>
    <a onClick={logoutHandler} style={{ backgroundColor: 'yellow', cursor: 'pointer' }}>
      logout
    </a>
    <br />
    {user?.email}
  </div>
}

export default HomePage
