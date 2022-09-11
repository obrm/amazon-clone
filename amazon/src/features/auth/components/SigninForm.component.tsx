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
  Divider
} from '@mui/material'

const SigninForm: FC = () => {
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('Clicked')
  }

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
              כניסה
            </Typography>

            <InputLabel
              sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
              htmlFor='email'
            >
              דואר אלקטרוני
            </InputLabel>
            <TextField
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
              type='password'
              name='password'
              id='password'
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
              כניסה
            </Button>
          </Grid>
        </form>
        <div style={{ marginTop: '30px' }}>
          <small>
            <span>
              אם תמשיך, אתה מסכים בכך{' '}
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
        <div style={{ margin: '30px 0' }}>
          <small>
            <a href='#'>זקוק לעזרה?</a>
          </small>
        </div>
      </Box>
      <div style={{ marginTop: '16px' }}>
        <Divider>
          <small style={{ color: '#767676' }}>
            הנך חדש ב Amazon?
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
            צור את חשבון Amazon שלך
          </Button>
        </Link>
      </div>
    </>
  )
}

export default SigninForm
