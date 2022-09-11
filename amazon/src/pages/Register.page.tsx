import { Helmet } from 'react-helmet'
import { AuthLayout, RegistrationForm } from '../features/auth/components'

const RegisterPage = () => {
  return (
    <AuthLayout>
      <Helmet>
        <title>רישום Amazon</title>
      </Helmet>
      <RegistrationForm />
    </AuthLayout>
  )
}

export default RegisterPage
