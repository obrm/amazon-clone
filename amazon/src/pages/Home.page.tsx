/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from "../hooks";
import { logout } from '../features/auth/authSlice';

const HomePage = () => {

  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/signin')
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
