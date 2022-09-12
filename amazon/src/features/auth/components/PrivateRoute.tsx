import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../../hooks'
import { verifyJwt } from '../authSlice'

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const { isSuccess, isAuthenticated, jwt } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!jwt || !jwt?.token) return

    dispatch(verifyJwt(jwt.token))
  }, [jwt, isSuccess, dispatch])

  return isAuthenticated ? page : <Navigate replace to='/signin' />
}

export default PrivateRoute