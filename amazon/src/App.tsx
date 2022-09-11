import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import { theme } from './shared/utils/theme'

import { HomePage, RegisterPage, SigninPage } from './pages'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/signin' element={<SigninPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
