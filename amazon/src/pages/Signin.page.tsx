import { Helmet } from 'react-helmet'
import { AuthLayout, SigninForm } from '../features/auth/components'

const SigninPage = () => {
  return (
    <AuthLayout>
      <Helmet>
        <title>כניסה ל-Amazon</title>
      </Helmet>
      <SigninForm />
    </AuthLayout>
  )
}

export default SigninPage
