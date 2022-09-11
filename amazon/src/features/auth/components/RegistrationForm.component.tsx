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

const RegistrationForm: FC = () => {
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('Clicked')
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
            placeholder='לפחות 6 תווים'
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor='confirmPassword'
          >
            אימות סיסמה
          </InputLabel>
          <TextField
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
