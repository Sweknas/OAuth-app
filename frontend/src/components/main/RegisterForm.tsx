import { useState, useEffect, FormEvent, Dispatch, SetStateAction } from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import { register } from '../../api'
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
  fullName: {
    text: 'Full name',
    placeholder: 'name...',
    type: 'text',
    value: '',
    valid: null,
    message: 'required',
    error: '',
  },
  email: {
    text: 'Email',
    placeholder: 'email...',
    type: 'email',
    value: '',
    valid: null,
    message: 'required',
    error: '',
  },
  password1: {
    text: 'Password',
    placeholder: 'password...',
    type: 'password',
    value: '',
    valid: null,
    message: 'required',
    error: '',
  },
  password2: {
    text: 'Confirm Password',
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

    // fullName done validated
    if (field === 'fullName') {
      return state
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

    //validate password match
    if (field === 'password1' || field === 'password2') {
      const otherField = field === 'password1'
        ? 'password2'
        : 'password1'
      const fieldMatches = state[field].value === state[otherField].value
      const fieldsNotEmpty = state[field].value.trim().length > 0 && state[otherField].value.trim().length > 0

      if (fieldsNotEmpty && !fieldMatches) {
        state['password1'].valid = false
        state['password1'].error = 'Passwords do not match'
        state['password2'].valid = false
        state['password2'].error = ''
      } else if (fieldMatches && state[field].value.trim().length > 7) {
        state[field].valid = true
        state[field].error = ''
        state[otherField].valid = true
        state[otherField].error = ''
      } else if (state[field].value.trim().length < 8) {
        state['password1'].valid = false
        state['password1'].error = 'Password needs to be atleast 8 charactars'
        state['password2'].valid = false
        state['password2'].error = ''
      }
      return state
    }
    return state
  }
}

type Props = {
  setUser: Dispatch<SetStateAction<UserState>>
}

function RegisterForm ({ setUser }: Props) {
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
      fullName: fields.fullName.value.trim(),
      email: fields.email.value.trim(),
      password: fields.password1.value.trim(),
    }
    const test = await register(data, setUser)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Register</h3>
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
          to='/'
        >
          Login
        </Link>
        <Button
          text='Register'
          type='submit'
          disabled={!formValid}
        />
      </div>
    </Form>
  )
}

export default RegisterForm
