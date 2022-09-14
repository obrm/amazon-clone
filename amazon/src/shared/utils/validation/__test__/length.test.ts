import { validatePasswordLength, validateNameLength } from '..'

describe('Field length validation', () => {
  describe('Name field length validation', () => {
    let name = ''

    test('a name should fail validation if it is not set', () => {
      expect(validateNameLength(name)).toEqual(false)
    })

    test('a name should fail validation if it is less than 2 characters', () => {
      name = 'a'
      expect(validateNameLength(name)).toEqual(false)
    })

    test('a name should pass validation if it is equal to 2 characters', () => {
      name = 'ab'
      expect(validateNameLength(name)).toEqual(true)
    })

    test('a name should pass validation if it is more than to 2 characters', () => {
      name = 'abcd efg'
      expect(validateNameLength(name)).toEqual(true)
    })
  })

  describe('Password field length validation', () => {
    let password = ''

    test('a password should fail validation if it is not set', () => {
      expect(validatePasswordLength(password)).toEqual(false)
    })

    test('a password should fail validation if it is less than 6 characters', () => {
      password = '12345'
      expect(validatePasswordLength(password)).toEqual(false)
    })
    test('a password should fail validation if it is more than 20 characters', () => {
      password = '1234567891123456789112345'
      expect(validatePasswordLength(password)).toEqual(false)
    })

    test('a password should pass validation if it is equal to 6 characters', () => {
      password = '123456'
      expect(validatePasswordLength(password)).toEqual(true)
    })

    test('a password should pass validation if it is more than to 6 characters', () => {
      password = '12345678910'
      expect(validatePasswordLength(password)).toEqual(true)
    })
  })
})
