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
  validatePasswordLength
} from '../../../shared/utils/validation'
import { LoginUser } from './../model';
import { login, reset } from './../authSlice';

const SigninForm: FC = () => {
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

  const dispatch = useAppDispatch()

  const { isLoading, isSuccess, isAuthenticated } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const clearForm = () => {
    emailClearHandler()
    passwordClearHandler()
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
      clearForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isSuccess])

  useEffect(() => {
    if (!isAuthenticated) return
    navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuthenticated])

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (emailHasError || passwordHasError) return

    if (!email || !password) return

    const loginUser: LoginUser = { email, password };

    dispatch(login(loginUser))
  }

  if (isLoading) return <CircularProgress sx={{ marginTop: '64px' }} color='primary' />

  return (
    <>
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
              ??????????
            </Typography>

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
              helperText={passwordHasError ? '?????????? ???? ??????????' : ''}
              type='password'
              name='password'
              id='password'
              variant='outlined'
              size='small'
            />

            <Button
              disabled={!validatePasswordLength(password) || !validateEmail(email)}
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
              ???? ??????????, ?????? ?????????? ??????{' '}
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
        <div style={{ margin: '30px 0' }}>
          <small>
            <a href='#'>???????? ???????????</a>
          </small>
        </div>
      </Box>
      <div style={{ marginTop: '16px' }}>
        <Divider>
          <small style={{ color: '#767676' }}>
            ?????? ?????? ?? Amazon?
          </small>
        </Divider>
        <Link to='/register' style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            style={{
              width: '100%',
              marginTop: '12px',
              height: '40px',
              backgroundColor: '#f1f1f1',
              color: '#000000',
              fontSize: '13.33px',
              textTransform: 'none'
            }}
          >
            ?????? ???? ?????????? Amazon ??????
          </Button>
        </Link>
      </div>
    </>
  )
}

export default SigninForm
