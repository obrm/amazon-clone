import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Badge,
  Box,
  Button,
  Toolbar
} from '@mui/material'

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useAppDispatch, useAppSelector } from "../../../hooks"
import { logout, selectedUser } from "../../auth/authSlice"


const Header = () => {
  const [cartCount, setCartCount] = useState(0)

  const { user } = useAppSelector(selectedUser)
  const { cart } = useAppSelector((state) => state.product)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0)
    setCartCount(() => totalQty)
  }, [cart])


  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: '#131921', color: '#ffffff', padding: '4px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src="/amazon-logo-white.png" alt="amazon logo" onClick={() => navigate('/')} style={{ width: '113px', paddingTop: '10px', cursor: 'pointer' }} />
          <div style={{ display: 'flex' }}>
            <div>
              <div>שלום, {user?.name} </div>
              <Button onClick={logoutHandler} sx={{ padding: 0, justifyContent: 'start', fontWeight: 'bold' }} color='inherit'>יציאה</Button>
            </div>
            <Button onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color='primary'>
                <ShoppingCartOutlinedIcon fontSize='large' />
              </Badge>
              <span style={{ color: '#ffffff', alignSelf: 'flex-end', fontWeight: 'bold' }}>עגלה</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header