import ValidatorFn from './models/ValidatorFn'
import { LengthOptions } from './models/options'

const _validateLength: ValidatorFn = (
  text: string,
  options?: LengthOptions
): boolean => {
  const textLength = text.trim().length

  if (options?.min && textLength < options.min) return false
  if (options?.max && textLength > options.max) return false

  return true
}

export const validatePasswordLength: ValidatorFn = (pw: string): boolean => {
  return _validateLength(pw, { min: 6, max: 20 })
}

export const validateNameLength: ValidatorFn = (name: string): boolean => {
  return _validateLength(name, { min: 2 })
}
