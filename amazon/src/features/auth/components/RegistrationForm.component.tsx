/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
} from '@mui/material'

import { useInput } from '../../../hooks'
import {
  validateEmail,
  validateNameLength,
  validatePasswordLength
} from '../../../shared/utils/validation'
import { NewUser } from './../model';

const RegistrationForm: FC = () => {
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    textBlurHandler: nameBlurHandler,
    textClearHandler: nameClearHandler
  } = useInput(validateNameLength)

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    textBlurHandler: emailBlurHandler,
    textClearHandler: emailClearHandler
  } = useInput(validateEmail)

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    textBlurHandler: passwordBlurHandler,
    textClearHandler: passwordClearHandler
  } = useInput(validatePasswordLength)

  const {
    text: confirmPassword,
    textChangeHandler: confirmPasswordChangeHandler,
    textBlurHandler: confirmPasswordBlurHandler,
    textClearHandler: confirmPasswordClearHandler
  } = useInput()

  const clearForm = () => {
    nameClearHandler()
    emailClearHandler()
    passwordClearHandler()
    confirmPasswordClearHandler()
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password && password !== confirmPassword) return

    if (nameHasError || emailHasError || passwordHasError) return

    if (!name || !email || !password || !confirmPassword) return

    const newUser: NewUser = {
      name,
      email,
      password
    }

    console.log('new user: ', newUser)

    clearForm()
  }

  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderColor: '#cccccc',
        width: '350px',
        marginTop: 2,
        borderRadius: '4px',
      }}
    >
      <form onSubmit={onSubmitHandler}>
        <Grid container direction='column' justifyContent='flex-start'>
          <Typography variant='h4' component='h1'>
            צור חשבון
          </Typography>

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor='name'
          >
            שם
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError && !name ? 'יש להקליד שם' : nameHasError && name.length < 3 ? 'שם צריך להיות ארוך מ-2 תווים' : ''}
            type='text'
            name='name'
            id='name'
            variant='outlined'
            size='small'
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor='email'
          >
            דואר אלקטרוני
          </InputLabel>
          <TextField
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError && !email ? 'דוא"ל הינו שדה חובה' : emailHasError && email ? 'כתובת הדוא"ל שגויה או לא חוקית' : ''}
            type='email'
            name='email'
            id='email'
            variant='outlined'
            size='small'
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor='password'
          >
            סיסמה
          </InputLabel>
          <TextField
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError && password.length < 6 ? 'נדרשים מינימום 6 תווים' : passwordHasError && password.length > 20 ? 'על הסיסמה להיות מקסימום 20 תווים' : ''}
            type='password'
            name='password'
            id='password'
            variant='outlined'
            size='small'
            placeholder='לפחות 6 תווים'
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor='confirmPassword'
          >
            אימות סיסמה
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={!!confirmPassword && confirmPassword !== password}
            helperText={confirmPassword && confirmPassword !== password ? 'הסיסמאות חייבות להתאים' : ''}
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            variant='outlined'
            size='small'
          />
          <Button
            type='submit'
            variant='contained'
            style={{
              marginTop: '16px',
              height: '40px',
              backgroundColor: '#f0c14b',
              color: '#000000',
              borderColor: '#a88734 #9c7e31 #846a29',
            }}
          >
            הרשמה
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: '30px' }}>
        <small>
          <span>
            בכך שתפתח חשבון, אתה מסכים{' '}
            <a href='#' style={{ textDecoration: 'none' }}>
              לתנאי השימוש
            </a>{' '}
            ו
            <a href='#' style={{ textDecoration: 'none' }}>
              להודעת הפרטיות
            </a>{' '}
            של אמזון.
          </span>
        </small>
      </div>

      <Divider
        sx={{
          margin: '20px auto',
          boxShadow: 1,
          width: '60%',
        }}
      />

      <div>
        <small>
          כבר יש לך חשבון?{' '}
          <Link to='/signin' style={{ textDecoration: 'none' }}>
            כניסה
          </Link>
        </small>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <small>
          <span>
            קנייה לעבודה?{' '}
            <a href='#' style={{ textDecoration: 'none' }}>
              פתיחת חשבון עסקי בחינם
            </a>
          </span>
        </small>
      </div>
    </Box>
  )
}

export default RegistrationForm
