import RegisterFormField from './RegisterFormField.interface'

type NewUser = Omit<RegisterFormField, 'confirmPassword'>

export default NewUser
