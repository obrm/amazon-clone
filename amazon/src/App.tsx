import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import { theme } from './shared/utils/theme'

import { PrivateRoute } from './features/auth/components'
import { HomePage, RegisterPage, SigninPage, CartPage } from './pages'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute page={<HomePage />} />} />
          <Route path='/cart' element={<PrivateRoute page={<CartPage />} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
