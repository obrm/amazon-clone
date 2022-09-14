import { validateEmail } from '..'

describe('Email validation', () => {
  let email = ''

  test('an empty input should not be valid', () => {
    expect(validateEmail(email)).toEqual(false)
  })

  test('it should have an @ symbol', () => {
    email = 'john@gamil.com'
    expect(email.includes('@')).toEqual(true)
  })

  test('it should have an . symbol', () => {
    expect(email.includes('.')).toEqual(true)
  })

  test('a valid email should pass', () => {
    expect(validateEmail(email)).toEqual(true)
  })

  test('an invalid email should not pass', () => {
    email = 'test@examplecom'
    expect(validateEmail(email)).toEqual(false)
  })
})
