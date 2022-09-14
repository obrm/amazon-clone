import { reducer, screen } from '../../../../shared/utils/test-utils'

import SigninForm from '../SigninForm.component'

describe('Sign-in Form', () => {
  let signInButton = null

  beforeEach(() => {
    reducer(<SigninForm />)
    signInButton = screen.getByRole('button', { name: 'כניסה' });
  })

  test('The login button should be in the document', () => {
    expect(signInButton).toBeInTheDocument()
  })

  test('The login button should be initially disabled', () => {
    expect(signInButton).toBeDisabled()
  })
})