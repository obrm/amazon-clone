/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
  CircularProgress
} from '@mui/material'

import { useInput, useAppDispatch, useAppSelector } from '../../../hooks'
import {
  validateEmail,
  validateNameLength,
  validatePasswordLength
} from '../../../shared/utils/validation'
import { NewUser } from './../model';
import { register, reset } from './../authSlice';

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

  const dispatch = useAppDispatch()

  const { isLoading, isSuccess } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
      clearForm()
      navigate('/signin')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isSuccess])

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

    dispatch(register(newUser))
  }

  if (isLoading) return <CircularProgress sx={{ marginTop: '64px' }} color='primary' />

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
            ?????? ??????????
          </Typography>

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor='name'
          >
            ????
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError && !name ? '???? ?????????? ????' : nameHasError && name.length < 3 ? '???? ???????? ?????????? ???????? ??-2 ??????????' : ''}
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
            ???????? ????????????????
          </InputLabel>
          <TextField
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError && !email ? '??????"?? ???????? ?????? ????????' : emailHasError && email ? '?????????? ????????"?? ?????????? ???? ???? ??????????' : ''}
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
            ??????????
          </InputLabel>
          <TextField
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError && password.length < 6 ? '???????????? ?????????????? 6 ??????????' : passwordHasError && password.length > 20 ? '???? ???????????? ?????????? ?????????????? 20 ??????????' : ''}
            type='password'
            name='password'
            id='password'
            variant='outlined'
            size='small'
            placeholder='?????????? 6 ??????????'
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor='confirmPassword'
          >
            ?????????? ??????????
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={!!confirmPassword && confirmPassword !== password}
            helperText={confirmPassword && confirmPassword !== password ? '???????????????? ???????????? ????????????' : ''}
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
            ??????????
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: '30px' }}>
        <small>
          <span>
            ?????? ?????????? ??????????, ?????? ??????????{' '}
            <a href='#' style={{ textDecoration: 'none' }}>
              ?????????? ????????????
            </a>{' '}
            ??
            <a href='#' style={{ textDecoration: 'none' }}>
              ???????????? ??????????????
            </a>{' '}
            ???? ??????????.
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
          ?????? ???? ???? ???????????{' '}
          <Link to='/signin' style={{ textDecoration: 'none' }}>
            ??????????
          </Link>
        </small>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <small>
          <span>
            ?????????? ?????????????{' '}
            <a href='#' style={{ textDecoration: 'none' }}>
              ?????????? ?????????? ???????? ??????????
            </a>
          </span>
        </small>
      </div>
    </Box>
  )
}

export default RegistrationForm
