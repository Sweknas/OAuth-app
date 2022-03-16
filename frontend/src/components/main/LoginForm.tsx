import { useState, useEffect, FormEvent, Dispatch, SetStateAction } from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import { login } from '../../api'
import { UserState } from '../../App'
import Button from '../common/Button'
import Form from '../common/Form'
import InputField from '../common/InputField'

type Field = {
  text: string
  placeholder: string
  type: string
  value: string
  valid: boolean | null
  message: string
  error: string
}

type State = {
  [key: string]: Field
}

const initialState = {
  email: {
    text: 'Email',
    placeholder: 'email...',
    type: 'email',
    value: '',
    valid: null,
    message: 'required',
    error: '',
  },
  password: {
    text: 'Password',
    placeholder: 'password...',
    type: 'password',
    value: '',
    valid: null,
    message: 'required',
    error: '',
  }
}

const useStyles = createUseStyles({
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    color: '#42d1f5'
  }
})

const validateFields = (field: string, value: string) => {
  return (orgState: State) => {
    let state = { ...orgState}
    state[field].value = value

    // validate not empty
    if (value.trim()) {
      state[field].valid = true
      state[field].error = ''
    } else {
      state[field].valid = false
      state[field].error = 'Required field'
    }

    //validate email
    if (field === 'email') {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())) {
        state[field].valid = true
        state[field].error = ''
      } else {
        state[field].valid = false
        state[field].error = 'unvalid email'
      }
      return state
    }

    return state
  }
}

type Props = {
  setUser: Dispatch<SetStateAction<UserState>>
}

function LoginForm ({ setUser }: Props) {
  const classes = useStyles()
  const [fields, setFields] = useState<State>(initialState)
  const [formValid, setFormValid] = useState(false)

  // validate form
  useEffect(() => {
    setFormValid(!Object.keys(fields).some(key => !fields[key].valid))
  }, [fields])

  const handleChange = (field: string, value: string) => {
    setFields(validateFields(field, value))
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const data = {
      email: fields.email.value.trim(),
      password: fields.password.value.trim(),
    }
    await login(data, setUser)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Login</h3>
      {Object.keys(fields).map((key) => {
        const field: Field = fields[key]
        return <InputField
          key={key}
          name={key}
          type={field.type}
          text={field.text}
          placeholder={field.placeholder}
          value={field.value}
          valid={field.valid}
          onChange={(e) => handleChange(key, e.target.value)}
          message={field.message}
          error={field.error}
        />
      })}
      <div className={classes.buttonContainer}>
        <Link
          className={classes.link}
          to='/register'
        >
          Register
        </Link>
        <Button
          text='Log in'
          type='submit'
          disabled={!formValid}
        />
      </div>
    </Form>
  )
}

export default LoginForm
