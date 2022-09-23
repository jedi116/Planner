import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signInWithGoogle, auth } from '../../../firebase/firebase'
import './index.css'
import LockIcon from '@mui/icons-material/Lock'
import GoogleIcon from '@mui/icons-material/Google'
import { toast } from 'react-toastify'
import Alert from '@mui/material/Alert'
import { BoxesLoaderComponent } from '../../common/boxeLoader'

interface formValidation {
  emailValid: boolean
  emailValidationErrorMessage: string | null
  passwordValid: boolean
  passwordValidationErrorMessage: string | null
}

const defaultFormValidationValues: formValidation = {
  emailValid: true,
  emailValidationErrorMessage: null,
  passwordValid: true,
  passwordValidationErrorMessage: null,
}
function Index() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [user, loading, error] = useAuthState(auth)
  const [formValidation, setFormValidation] = useState<formValidation>(defaultFormValidationValues)
  const navigate = useNavigate()

  const validateForm = () => {
    setFormValidation(defaultFormValidationValues)
    if (email.length !== 0 && password.length !== 0) {
      if (
        email.includes('@') &&
        !password.includes(email) &&
        !password.includes(email.split('@')[0])
      ) {
        return true
      }
    }
    const validationTemp = {
      ...defaultFormValidationValues,
    }
    if (email.length === 0) {
      validationTemp.emailValid = false
      validationTemp.emailValidationErrorMessage = 'Email can not be empty'
    } else if (!email.includes('@')) {
      validationTemp.emailValid = false
      validationTemp.emailValidationErrorMessage = 'Enter correct email format'
    }

    if (password.length === 0) {
      validationTemp.passwordValid = false
      validationTemp.passwordValidationErrorMessage = 'Password can not be empty'
    } else if (password.includes(email)) {
      validationTemp.passwordValid = false
      validationTemp.passwordValidationErrorMessage = 'Password can not contain email'
    } else if (password.includes(email.split('@')[0])) {
      validationTemp.passwordValid = false
      validationTemp.passwordValidationErrorMessage = 'Password can not contain part of the email'
    }
    setFormValidation({
      ...validationTemp,
    })
    return false
  }

  const handleLogin = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      const siginInResponse = await signInWithEmailAndPassword(auth, email, password)
      toast.success('Successfully logged in')
    } catch (e: any) {
      toast.error(e.message.split('/')[1].split(')')[0])
    }
  }
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) navigate('/home')
  }, [user, loading])
  return (
    <div>
      {loading ? (
        <BoxesLoaderComponent />
      ) : (
        <div className='login'>
          <div className='form'>
            <form className='login-form' onSubmit={handleLogin}>
              <LockIcon className='form__icon' fontSize='large' />
              {!formValidation.emailValid && (
                <Alert severity='error'>{formValidation.emailValidationErrorMessage}</Alert>
              )}
              <input
                id='standard-basic'
                className='form__input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='E-mail Address'
                type={'email'}
                required
              />
              {!formValidation.passwordValid && (
                <Alert severity='error'>{formValidation.passwordValidationErrorMessage}</Alert>
              )}
              <input
                id='standard-basic'
                className='form__input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                type={'password'}
                required
              />

              <button className='form__button' onClick={handleLogin}>
                Login
              </button>
              <span>- or - </span>
              <button className='form__button' onClick={signInWithGoogle}>
                <GoogleIcon style={{ marginRight: '20px' }} /> Google login
              </button>
              <div>
                <Link to='/reset'>Forgot Password</Link>
              </div>
              <div>
                {"Don't have an account?"} <Link to='/register'>Register</Link> now.
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default Index
